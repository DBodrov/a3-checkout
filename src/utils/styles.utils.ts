import {IAppConfig} from '@/context/ConfigProvider/types';

export function applyCSSVariables(theme: IAppConfig['theme']) {
  if (theme) {
    const themeValue: Array<[string, string]> = [
      ['--color-primary', theme.mainColor ?? ''],
      ['--color-link', theme.linkColor ?? ''],
    ];
    themeValue.forEach(v => document.documentElement.style.setProperty(v[0], v[1]));
  }
}
