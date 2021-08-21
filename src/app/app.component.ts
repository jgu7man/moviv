import { Component } from '@angular/core';
import { MxAlert, MxCache, MxColor, MxText } from "@marxa/devkit";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private _color: MxColor,
    private _text: MxText,
    private _alert: MxAlert,
    private _cache: MxCache,
  ) {
    this._alert.storeError = false
    this._text.loadFontAwesome()
    this._cache.cacheTagName = 'moviv'
    this._color.ColorPalette = {
      main: '#005daa',
      accent: '#09b8a9',
      dark1: '#00307f',
      dark2: '#001d4d',
      dark3: '#000a1a',
      ligth1: '#80aed5',
      ligth2: '#b3cee6',
      ligth3: '#e0ecf5',
    }
  }


}
