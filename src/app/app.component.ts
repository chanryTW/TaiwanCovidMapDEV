import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { ApiService } from './@base/api/api.service';
import { HttpClient } from '@angular/common/http';
import { FeatureCollection, GeoJSON } from './app';

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
  markers: any;

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
      zoom: 13,
      center: [this.lng, this.lat]
    });

    // 地圖控制器
    this.map.addControl(new mapboxgl.NavigationControl());

    // 標記點被點擊
    this.map.on('click', (e) => {
      const coordinates = [e.lngLat.lng, e.lngLat.lat];

    });
  }

  /**
   * 取得快篩資料
   * @param ok 完成取得資料函式
   */
  getFstdata(ok?: () => void): void {
    this.api.get('https://data.nhi.gov.tw/resource/Nhi_Fst/Fstdata.csv', { responseType: 'text' }).subscribe((res) => {
      const data = JSON.parse(this.csvJSON(res));
      this.markers = data;
      console.log(data);
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
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return JSON.stringify(result); //JSON
  }

  /** 新增標記點 */
  addMark(): void {
    this.map.on('load', () => {
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
        if (item.經度 && item.緯度) {
          newMarker.push(new GeoJSON([item.經度, item.緯度], { message: 'test' }));
        }
      })

      // 導入標記點
      let source: any = this.map.getSource('COVID19AntigenSelfTest');
      source.setData(new FeatureCollection(newMarker));      

      // 創建Layer
      this.map.addLayer({
        id: 'COVID19AntigenSelfTest',
        source: 'COVID19AntigenSelfTest',
        type: 'symbol',
        layout : {
          'text-field': '{message}',
          'text-size': 24,
          'text-transform': 'uppercase',
          'icon-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      })
    });
  }
}
