export interface Theme {
  slideBarBackground: string,
  slideBarTextColor: string,
  slideBarTextAColor: string,
  slideBarToggleBg: string,
  navbarBackground: string
}

interface ThemeType {
  [propName: string]: Theme
}

const themes: ThemeType = {
  default: {
    slideBarBackground: '#2D4156',
    slideBarTextColor: '#BFCBD9',
    slideBarTextAColor: '#409EFF',
    slideBarToggleBg: '#1f2d3d',
    navbarBackground: '#fff'
  },
  light: {
    slideBarBackground: '#fff',
    slideBarTextColor: '#666',
    slideBarTextAColor: '#000',
    slideBarToggleBg: 'rgb(240, 240, 240)',
    navbarBackground: '#eee'
  },
  guaiyi: {
    slideBarBackground: 'green',
    slideBarTextColor: '#fff',
    slideBarTextAColor: 'skyblue',
    slideBarToggleBg: 'orange',
    navbarBackground: 'lightgreen'
  }
}

export default themes