import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { ApiService } from './@base/api/api.service';
import { HttpClient } from '@angular/common/http';
import { AntigenSelfTestStore, AntigenSelfTestStoreMap, AntigenSelfTestStoreType, FeatureCollection, GeoJSON } from './app';
import { window } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('mapElement') mapElement!: ElementRef;
  
  /** 標題 */
  title = 'TaiwanCovidMap';

  /** 地圖 */
  map!: mapboxgl.Map;

  /** 風格 */
  style: string = 'mapbox://styles/chanrytw/cl317cfmc000h15jyr6o1a42e';

  /** 經度 */
  lng: number = 121.56465358585622;

  /** 緯度 */
  lat: number = 25.043757005733518;
  
  /** 縮放大小 */
  zoom: number = 13;

  /** 標記點 */
  markers: AntigenSelfTestStore[] = [];

  /** 現在選擇的快篩資訊 */
  nowSelectAntigenSelfTestStore: AntigenSelfTestStore | null = null

  constructor(
    private api: ApiService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    // 賦予令牌
    (mapboxgl as any).accessToken = environment.mapboxAccessToken;
  }

  ngAfterViewInit(): void {
    // 創建地圖
    this.buildMap();

    // 檢查支援度
    if (navigator.geolocation) {
      // 取得使用者位置
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        // 移動定位
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }

    // 取得快篩資料
    this.getFstdata(() => {
      // 新增標記點
      this.addMark();
    });
  }

  /** 創建地圖 */
  buildMap(): void {
    this.map = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: this.style,
      zoom: 12,
      center: [this.lng, this.lat]
    });

    // 地圖控制器
    this.map.addControl(new mapboxgl.NavigationControl());

    // 不開放旋轉
    this.map.dragRotate.disable();
  }

  /**
   * 取得快篩資料
   * @param ok 完成取得資料函式
   */
  getFstdata(ok?: () => void): void {
    this.api.get('https://data.nhi.gov.tw/resource/Nhi_Fst/Fstdata.csv', { responseType: 'text' }).subscribe((res) => {
      const data = JSON.parse(this.csvJSON(res));
      this.markers = data;
      if (ok) {
        ok();
      }
    });
  }

  /** CSV to JSON */
  csvJSON(csv: string): string {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj: any = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[this.mapKey(headers[j])] = currentline[j];
      }

      result.push(obj);
    }

    return JSON.stringify(result); //JSON
  }

  /** 參數名稱對應表 */
  mapKey(Key: string): string {
    // 去除空格
    Key = Key.replace('\r', '');
    // 回傳對應Key
    return AntigenSelfTestStoreMap[Key as AntigenSelfTestStoreType]
  }

  /** 新增標記點 */
  addMark(): void {
    this.map.on('load', () => {
      // 獲取標記點圖片
      this.map.loadImage('../assets/icon/AntigenSelfTest.png', (error, image: any)=>{
        if (error) throw error;
        this.map.addImage('AntigenSelfTest-marker', image);

        // 新增 map Source 資料
        this.map.addSource('COVID19AntigenSelfTest', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        })

        // 轉換標記點格式
        let newMarker: GeoJSON[] = [];
        this.markers.map((item: any) => {
          if (item.lan && item.lat) {
            newMarker.push(new GeoJSON([item.lan, item.lat], item));
          }
        })

        // 導入標記點
        let source: any = this.map.getSource('COVID19AntigenSelfTest');
        source.setData(new FeatureCollection(newMarker));

        // 創建Layer
        this.map.addLayer({
          id: 'COVID19AntigenSelfTestLayer',
          source: 'COVID19AntigenSelfTest',
          type: 'symbol',
          layout: {
            'icon-image': 'AntigenSelfTest-marker',
            'text-field': ['get', 'posName'],
            'text-font': [
              'Open Sans Semibold',
            ],
            'text-offset': [-0.3, 1.5],
          },
          paint: {
            "text-color": "#414141"
          }
        })

        // 標記點被點擊
        this.map.on('click', 'COVID19AntigenSelfTestLayer', (e: any) => {
          // 載入現在選取資訊
          this.nowSelectAntigenSelfTestStore = e.features[0].properties as AntigenSelfTestStore;
          // 移動定位
          this.map.flyTo({
            center: [e.lngLat.lng + 0.001, e.lngLat.lat],
            zoom: 15
          })
        });

        // 標記點滑鼠移入
        this.map.on('mouseenter', 'COVID19AntigenSelfTestLayer', () => {
          this.map.getCanvas().style.cursor = 'pointer';
        });

        // 標記點滑鼠移出
        this.map.on('mouseleave', 'COVID19AntigenSelfTestLayer', () => {
          this.map.getCanvas().style.cursor = '';
        });
      });
    });
  }

  /** 前往地址 */
  goAddress(nowSelectAntigenSelfTestStore: AntigenSelfTestStore | null): void {
    if (nowSelectAntigenSelfTestStore) {
      let addString = `https://www.google.com.tw/maps/place/${nowSelectAntigenSelfTestStore.posAddress}/@${nowSelectAntigenSelfTestStore.lat},${nowSelectAntigenSelfTestStore.lan},15z`;
      open(addString);
    }
  }

  /** 撥打電話 */
  goPhone(nowSelectAntigenSelfTestStore: AntigenSelfTestStore | null): void {
    if (nowSelectAntigenSelfTestStore) {
      if (nowSelectAntigenSelfTestStore.posPhone) {
        document.location.href = `tel:${nowSelectAntigenSelfTestStore.posPhone}`;
      }      
    }
  }
}
