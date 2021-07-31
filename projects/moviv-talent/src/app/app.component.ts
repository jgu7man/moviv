import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { MxAlert, MxColor, MxText } from '@marxa/devkit';

@Component({
  selector: 'ma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'moviv-talent';
  constructor(
    private _color: MxColor,
    private _text: MxText,
    private _alert: MxAlert,
    private _overlay: OverlayContainer
  ) {
    this._alert.storeError = false
    this._text.loadFontAwesome()
    this._color.ColorPalette = {
      main: '#ffeb3b',
      accent: '#202020',
      dark1: '#00307f',
      dark2: '#001d4d',
      dark3: '#000a1a',
      ligth1: '#80aed5',
      ligth2: '#b3cee6',
      ligth3: '#e0ecf5',
    }
    this.onSetTheme('oscura-theme')
  }

  @HostBinding( 'class' ) componentCssClass: any;
  onSetTheme(theme: string) {
    this._overlay.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

}
