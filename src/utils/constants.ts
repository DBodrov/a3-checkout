export const TNS_IDs = ['4245', '4243', '4244', '4246', '4249', '4242', '4247', '4250', '4248', '4251'];

export function isTns(id: string) {
  return TNS_IDs.includes(id);
}

export const TNS_LOGOS: Record<string, string> = {
  '4242': 'https://cdn.tns-e.ru/medialibrary/c66/Novgorod.png',
  '4243': 'https://cdn.tns-e.ru/medialibrary/5ed/voronezh.png',
  '4244': 'https://cdn.tns-e.ru/medialibrary/314/Kareliya.png',
  '4245': 'https://cdn.tns-e.ru/medialibrary/e56/kuban.png',
  '4246': 'https://cdn.tns-e.ru/medialibrary/98c/mari_el.png',
  '4247': 'https://cdn.tns-e.ru/medialibrary/0b6/penza.png',
  '4248': 'https://cdn.tns-e.ru/medialibrary/b74/Tula.png',
  '4249': 'https://cdn.tns-e.ru/medialibrary/833/nn.png',
  '4250': 'https://cdn.tns-e.ru/medialibrary/60b/rostov.png',
  '4251': 'https://cdn.tns-e.ru/medialibrary/3b7/yaroslavl.png',
};

const TNS_HOME_URLS: Record<string, string> = {
  '4242': 'novgorod.tns-e.ru',
  '4243': 'voronezh.tns-e.ru',
  '4244': 'karelia.tns-e.ru',
  '4245': 'kuban.tns-e.ru',
  '4246': 'mari-el.tns-e.ru',
  '4247': 'penza.tns-e.ru',
  '4248': 'tula.tns-e.ru',
  '4249': 'nn.tns-e.ru',
  '4250': 'rostov.tns-e.ru',
  '4251': 'yar.tns-e.ru',
};

type TTNSUrl = {
  id: string;
  logo: string;
  homeUrl: string;
}
export function readTNSUrls() {
  return TNS_IDs.reduce((acc: TTNSUrl[], id: string) => {
    const params = {
      id,
      logo: TNS_LOGOS[id],
      homeUrl: `https://${TNS_HOME_URLS[id]}`
    }
    acc.push(params);
    return acc;
  }, [])
}

export function readTNSUrlsById(id: string) {
  return readTNSUrls().find(p => p.id === id);
}
