// export class GeoJSON {
//   /**
//    * GeoJSON
//    */
//   constructor(
//     public type: string = 'Feature',
//     public geometry: GeoJSONGeometry = new GeoJSONGeometry(),
//     public properties: GeoJSONProperties = new GeoJSONProperties()
//   ) {}
// }

// export class GeoJSONGeometry {
//   /**
//    * Geometry
//    */
//   constructor(
//     public type: string = 'Feature',
//     public coordinates: number[] = [],
//   ) {}
// }

// export class GeoJSONProperties {
//   /**
//    * Properties
//    */
//   constructor(
//     public 'title': string = 'Mapbox DC',
//     public 'marker-symbol': string = 'Feature',
//   ) { }
// }

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