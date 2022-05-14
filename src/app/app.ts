export interface IGeometry {
  type: string;
  coordinates: number[];
}

export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  properties?: any;
  $key?: string;
}

export class GeoJSON implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;

  constructor(
    public coordinates: any,
    public properties?: any
  ) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates,
    }
  }
}

export class FeatureCollection {
  type = 'FeatureCollection';

  constructor(
    public features: Array<GeoJSON>
  ) {}
}

/** 快篩診所資訊 */
export const AntigenSelfTestStoreMap = {
  來源資料時間: 'time',
  備註: 'remark',
  廠牌項目: 'company',
  快篩試劑截至目前結餘存貨數量: 'quantity',
  經度: 'lan',
  緯度: 'lat',
  醫事機構代碼: 'posCode',
  醫事機構名稱: 'posName',
  醫事機構地址: 'posAddress',
  醫事機構電話: 'posPhone',
};
export class AntigenSelfTestStore {
  constructor(
    public time: string | null = null,
    public remark: string | null = null,
    public company: string | null = null,
    public quantity: string | null = null,
    public lan: string | null = null,
    public lat: string | null = null,
    public posCode: string | null = null,
    public posName: string | null = null,
    public posAddress: string | null = null,
    public posPhone: string | null = null,
  ) {}
}
export type AntigenSelfTestStoreType = keyof typeof AntigenSelfTestStoreMap;