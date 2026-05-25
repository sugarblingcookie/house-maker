// data.js — localStorage 저장/불러오기 + JSON 내보내기/가져오기

// ─── 직장 인구 데이터 (출처: 월부, 시군구별 종사자 및 사업체수) ──────
const WORK_DATA = {
  '서울': [
    { district: '강남구',   grade: 'S', workers: 801419, businesses: 110007 },
    { district: '서초구',   grade: 'S', workers: 487976, businesses: 71958  },
    { district: '중구',     grade: 'S', workers: 386564, businesses: 70308  },
    { district: '영등포구', grade: 'S', workers: 435017, businesses: 74562  },
    { district: '송파구',   grade: 'S', workers: 400781, businesses: 74531  },
    { district: '종로구',   grade: 'A', workers: 275063, businesses: 48361  },
    { district: '강서구',   grade: 'A', workers: 290473, businesses: 58806  },
    { district: '마포구',   grade: 'A', workers: 279788, businesses: 56782  },
    { district: '금천구',   grade: 'A', workers: 255449, businesses: 47964  },
    { district: '구로구',   grade: 'A', workers: 240689, businesses: 52791  },
    { district: '성동구',   grade: 'A', workers: 203221, businesses: 41665  },
    { district: '강동구',   grade: 'B', workers: 157465, businesses: 41660  },
    { district: '동대문구', grade: 'B', workers: 146383, businesses: 42813  },
    { district: '용산구',   grade: 'B', workers: 152605, businesses: 29680  },
    { district: '광진구',   grade: 'B', workers: 129707, businesses: 33706  },
    { district: '양천구',   grade: 'B', workers: 133776, businesses: 37929  },
    { district: '노원구',   grade: 'B', workers: 133398, businesses: 37909  },
    { district: '관악구',   grade: 'B', workers: 128417, businesses: 37915  },
    { district: '서대문구', grade: 'B', workers: 118256, businesses: 28522  },
    { district: '성북구',   grade: 'B', workers: 111005, businesses: 23617  },
    { district: '동작구',   grade: 'B', workers: 106159, businesses: 19793  },
    { district: '중랑구',   grade: 'B', workers: 113144, businesses: 39310  },
    { district: '은평구',   grade: 'B', workers: 109031, businesses: 36509  },
    { district: '강북구',   grade: 'C', workers:  80222, businesses: 26385  },
    { district: '도봉구',   grade: 'C', workers:  79097, businesses: 25391  },
  ],
  '경기': [
    { district: '화성시',       grade: 'S', workers: 564646, businesses: 109971 },
    { district: '성남시',       grade: 'S', workers: 534792, businesses:  97955 },
    { district: '성남시 분당구', grade: 'S', workers: 345459, businesses:  49505 },
    { district: '수원시',       grade: 'S', workers: 481383, businesses: 110987 },
    { district: '용인시',       grade: 'S', workers: 414867, businesses:  98465 },
    { district: '고양시',       grade: 'S', workers: 381611, businesses: 110660 },
    { district: '안산시',       grade: 'S', workers: 341959, businesses:  81372 },
    { district: '부천시',       grade: 'S', workers: 318670, businesses:  87889 },
    { district: '안양시',       grade: 'A', workers: 272065, businesses:  63452 },
    { district: '평택시',       grade: 'A', workers: 276230, businesses:  60910 },
    { district: '시흥시',       grade: 'A', workers: 242187, businesses:  69637 },
    { district: '파주시',       grade: 'A', workers: 225992, businesses:  56504 },
    { district: '남양주시',     grade: 'A', workers: 215236, businesses:  66794 },
    { district: '김포시',       grade: 'A', workers: 213769, businesses:  62310 },
    { district: '안산시 단원구', grade: 'A', workers: 247815, businesses:  50693 },
    { district: '광주시',       grade: 'B', workers: 160061, businesses:  46834 },
    { district: '고양시 일산동구', grade: 'B', workers: 160493, businesses: 43411 },
    { district: '고양시 덕양구',   grade: 'B', workers: 140713, businesses: 40852 },
    { district: '이천시',       grade: 'B', workers: 138180, businesses:  28608 },
    { district: '의정부시',     grade: 'B', workers: 134826, businesses:  40864 },
    { district: '용인시 기흥구', grade: 'B', workers: 183105, businesses:  39614 },
    { district: '용인시 처인구', grade: 'B', workers: 144275, businesses:  34775 },
    { district: '수원시 영통구', grade: 'B', workers: 168344, businesses:  30260 },
    { district: '수원시 권선구', grade: 'B', workers: 124748, businesses:  34033 },
    { district: '수원시 팔달구', grade: 'B', workers: 106946, businesses:  25731 },
    { district: '안양시 동안구', grade: 'B', workers: 181783, businesses:  40016 },
    { district: '성남시 중원구', grade: 'B', workers: 102480, businesses:  25547 },
    { district: '군포시',       grade: 'B', workers: 115375, businesses:  26843 },
    { district: '안성시',       grade: 'B', workers: 114117, businesses:  26323 },
    { district: '포천시',       grade: 'B', workers: 104004, businesses:  27380 },
    { district: '광명시',       grade: 'B', workers: 105342, businesses:  26653 },
    { district: '양주시',       grade: 'B', workers: 101546, businesses:  28132 },
    { district: '하남시',       grade: 'B', workers: 113692, businesses:  32386 },
    { district: '오산시',       grade: 'C', workers:  77284, businesses:  20094 },
    { district: '구리시',       grade: 'C', workers:  69136, businesses:  21325 },
    { district: '의왕시',       grade: 'C', workers:  61890, businesses:  13761 },
    { district: '여주시',       grade: 'C', workers:  57915, businesses:  18154 },
    { district: '과천시',       grade: 'C', workers:  37242, businesses:   6039 },
    { district: '양평군',       grade: 'C', workers:  38346, businesses:  13485 },
    { district: '동두천시',     grade: 'C', workers:  30843, businesses:   9011 },
    { district: '가평군',       grade: 'C', workers:  30014, businesses:   9289 },
    { district: '연천군',       grade: 'C', workers:  21350, businesses:   8967 },
    { district: '안산시 상록구', grade: 'C', workers:  94144, businesses:  30679 },
    { district: '수원시 장안구', grade: 'C', workers:  81345, businesses:  20963 },
    { district: '용인시 수지구', grade: 'C', workers:  87487, businesses:  24076 },
    { district: '고양시 일산서구', grade: 'C', workers: 80405, businesses: 26397 },
    { district: '안양시 만안구', grade: 'C', workers:  90282, businesses:  23436 },
    { district: '성남시 수정구', grade: 'C', workers:  86853, businesses:  22903 },
  ],
  '인천': [
    { district: '남동구',   grade: 'A', workers: 255508, businesses: 57621 },
    { district: '서구',     grade: 'A', workers: 230658, businesses: 58270 },
    { district: '부평구',   grade: 'B', workers: 166781, businesses: 45679 },
    { district: '미추홀구', grade: 'B', workers: 135727, businesses: 41395 },
    { district: '연수구',   grade: 'B', workers: 145549, businesses: 32548 },
    { district: '중구',     grade: 'B', workers: 115326, businesses: 22370 },
    { district: '계양구',   grade: 'C', workers:  99226, businesses: 27913 },
    { district: '동구',     grade: 'C', workers:  40492, businesses: 11247 },
    { district: '강화군',   grade: 'C', workers:  26249, businesses:  9256 },
    { district: '옹진군',   grade: 'C', workers:   7932, businesses:  2593 },
  ],
  '부산': [
    { district: '부산진구', grade: 'B', workers: 174317, businesses: 44355 },
    { district: '해운대구', grade: 'B', workers: 154115, businesses: 40946 },
    { district: '강서구',   grade: 'B', workers: 143600, businesses: 30038 },
    { district: '사상구',   grade: 'B', workers: 124257, businesses: 36104 },
    { district: '사하구',   grade: 'B', workers: 113587, businesses: 29196 },
    { district: '금정구',   grade: 'B', workers: 102359, businesses: 26714 },
    { district: '연제구',   grade: 'C', workers:  96109, businesses: 23946 },
    { district: '동래구',   grade: 'C', workers:  97700, businesses: 27667 },
    { district: '남구',     grade: 'C', workers:  93744, businesses: 24190 },
    { district: '동구',     grade: 'C', workers:  76827, businesses: 18208 },
    { district: '기장군',   grade: 'C', workers:  77117, businesses: 17930 },
    { district: '중구',     grade: 'C', workers:  69033, businesses: 18306 },
    { district: '북구',     grade: 'C', workers:  66682, businesses: 21049 },
    { district: '수영구',   grade: 'C', workers:  62351, businesses: 19613 },
    { district: '영도구',   grade: 'C', workers:  46978, businesses: 11616 },
    { district: '서구',     grade: 'C', workers:  45728, businesses: 11376 },
  ],
  '대구': [
    { district: '달서구', grade: 'A', workers: 221394, businesses: 59739 },
    { district: '북구',   grade: 'B', workers: 173854, businesses: 53909 },
    { district: '수성구', grade: 'B', workers: 140216, businesses: 36963 },
    { district: '동구',   grade: 'B', workers: 126452, businesses: 36892 },
    { district: '달성군', grade: 'B', workers: 116098, businesses: 26278 },
    { district: '중구',   grade: 'C', workers:  87743, businesses: 25518 },
    { district: '서구',   grade: 'C', workers:  80424, businesses: 23088 },
    { district: '남구',   grade: 'C', workers:  58382, businesses: 17411 },
  ],
  '대전': [
    { district: '유성구', grade: 'A', workers: 204522, businesses: 37275 },
    { district: '서구',   grade: 'B', workers: 198272, businesses: 49273 },
    { district: '중구',   grade: 'B', workers: 102690, businesses: 28362 },
    { district: '대덕구', grade: 'B', workers: 101980, businesses: 25405 },
    { district: '동구',   grade: 'C', workers:  80993, businesses: 25405 },
  ],
  '광주': [
    { district: '광산구', grade: 'B', workers: 186454, businesses: 48342 },
    { district: '북구',   grade: 'B', workers: 181016, businesses: 46173 },
    { district: '서구',   grade: 'B', workers: 167123, businesses: 39773 },
    { district: '동구',   grade: 'C', workers:  73012, businesses: 17979 },
    { district: '남구',   grade: 'C', workers:  68656, businesses: 18706 },
  ],
  '울산': [
    { district: '남구',   grade: 'B', workers: 174836, businesses: 41144 },
    { district: '울주군', grade: 'B', workers: 121819, businesses: 25094 },
    { district: '북구',   grade: 'B', workers: 108900, businesses: 18017 },
    { district: '동구',   grade: 'C', workers:  76269, businesses: 10717 },
    { district: '중구',   grade: 'C', workers:  62160, businesses: 20436 },
  ],
  '세종': [
    { district: '세종시', grade: 'B', workers: 152974, businesses: 30478 },
  ],
  '강원': [
    { district: '원주시', grade: 'B', workers: 167279, businesses: 42783 },
    { district: '춘천시', grade: 'B', workers: 127454, businesses: 32958 },
    { district: '강릉시', grade: 'C', workers:  98995, businesses: 29034 },
  ],
  '충북': [
    { district: '청주시', grade: 'S', workers: 394442, businesses: 91315 },
    { district: '충주시', grade: 'B', workers: 107169, businesses: 26893 },
  ],
  '충남': [
    { district: '천안시', grade: 'S', workers: 321670, businesses: 74581 },
    { district: '아산시', grade: 'A', workers: 204324, businesses: 35938 },
  ],
  '전북': [
    { district: '전주시', grade: 'S', workers: 321670, businesses: 74581 },
    { district: '익산시', grade: 'B', workers: 123241, businesses: 35427 },
    { district: '군산시', grade: 'B', workers: 116443, businesses: 33592 },
  ],
  '전남': [
    { district: '여수시', grade: 'B', workers: 144584, businesses: 33780 },
    { district: '순천시', grade: 'B', workers: 111318, businesses: 32480 },
    { district: '광양시', grade: 'C', workers:  90334, businesses: 18979 },
    { district: '목포시', grade: 'C', workers:  86996, businesses: 29018 },
    { district: '나주시', grade: 'C', workers:  62999, businesses: 15459 },
    { district: '무안군', grade: 'C', workers:  36087, businesses:  9738 },
  ],
  '경북': [
    { district: '포항시', grade: 'A', workers: 226982, businesses: 59457 },
    { district: '구미시', grade: 'A', workers: 207975, businesses: 46926 },
    { district: '경주시', grade: 'B', workers: 131043, businesses: 33379 },
    { district: '경산시', grade: 'B', workers: 119923, businesses: 30358 },
  ],
  '경남': [
    { district: '창원시', grade: 'S', workers: 469009, businesses: 114965 },
    { district: '김해시', grade: 'A', workers: 255401, businesses:  67905 },
    { district: '양산시', grade: 'B', workers: 164808, businesses:  41370 },
    { district: '진주시', grade: 'B', workers: 151143, businesses:  41268 },
    { district: '거제시', grade: 'B', workers: 104753, businesses:  21513 },
  ],
  '제주': [
    { district: '제주시',  grade: 'A', workers: 241012, businesses: 70039 },
    { district: '서귀포시', grade: 'C', workers:  77879, businesses: 23962 },
  ],
};

const DB_KEY = 'apt_tracker_v1';

// ─── IndexedDB (사진 이미지 데이터 전용) ─────────────────────────────
// localStorage에는 id/caption 등 메타만 저장, 이미지 data는 여기에 저장
const IDB_NAME = 'apt_tracker_photos';
const IDB_STORE = 'photos';

function _openPhotoDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 2);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      let store;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        store = db.createObjectStore(IDB_STORE, { keyPath: 'id' });
      } else {
        store = e.target.transaction.objectStore(IDB_STORE);
      }
      if (!store.indexNames.contains('folderId')) {
        store.createIndex('folderId', 'folderId', { unique: false });
      }
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}
async function _idbPut(id, folderId, data) {
  const db = await _openPhotoDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put({ id, folderId, data });
    tx.oncomplete = resolve;
    tx.onerror = e => reject(e.target.error);
  });
}
async function _idbGet(id) {
  const db = await _openPhotoDB();
  return new Promise((resolve, reject) => {
    const req = db.transaction(IDB_STORE).objectStore(IDB_STORE).get(id);
    req.onsuccess = e => resolve(e.target.result?.data || null);
    req.onerror = e => reject(e.target.error);
  });
}
async function _idbDelete(id) {
  const db = await _openPhotoDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).delete(id);
    tx.oncomplete = resolve;
    tx.onerror = e => reject(e.target.error);
  });
}
async function _idbGetAll() {
  const db = await _openPhotoDB();
  return new Promise((resolve, reject) => {
    const req = db.transaction(IDB_STORE).objectStore(IDB_STORE).getAll();
    req.onsuccess = e => {
      const map = {};
      e.target.result.forEach(r => { map[r.id] = { folderId: r.folderId, data: r.data }; });
      resolve(map);
    };
    req.onerror = e => reject(e.target.error);
  });
}
async function _idbGetAllForFolder(folderId) {
  const db = await _openPhotoDB();
  return new Promise((resolve, reject) => {
    const store = db.transaction(IDB_STORE).objectStore(IDB_STORE);
    const req = store.indexNames.contains('folderId')
      ? store.index('folderId').getAll(IDBKeyRange.only(folderId))
      : store.getAll();
    req.onsuccess = e => {
      const map = {};
      e.target.result.filter(r => r.folderId === folderId).forEach(r => { map[r.id] = r.data; });
      resolve(map);
    };
    req.onerror = e => reject(e.target.error);
  });
}

// 폴더 사진 목록을 메타+이미지 데이터 합쳐서 반환 (비동기)
async function loadPhotosForFolder(folderId) {
  const folder = getFolder(folderId);
  const metas = folder?.photos || [];
  if (!metas.length) return [];
  const dataMap = await _idbGetAllForFolder(folderId);
  return metas.map(p => ({ ...p, data: dataMap[p.id] || '' }));
}

// 폴더 그래프 목록을 메타+이미지 데이터 합쳐서 반환 (비동기)
async function loadGraphsForFolder(folderId) {
  const folder = getFolder(folderId);
  const metas = folder?.graphs || [];
  if (!metas.length) return [];
  const dataMap = await _idbGetAllForFolder(folderId);
  return metas.map(g => ({ ...g, data: dataMap[g.id] || '' }));
}

// 입지분석 사진(loc/school/env)을 IDB에서 로드
async function loadMemoPhoto(folderId, key) {
  return await _idbGet(`__${key}_${folderId}`) || '';
}

// 입지분석 사진을 IDB에 저장 (data='' 이면 삭제)
async function saveMemoPhoto(folderId, key, data) {
  const id = `__${key}_${folderId}`;
  if (data) await _idbPut(id, folderId, data);
  else await _idbDelete(id);
}

// 기존 localStorage 이미지 데이터를 IndexedDB로 전부 이전 (앱 시작 시 1회)
async function migrateToIDB() {
  const db = loadDB();
  let needsSave = false;
  for (const folder of db.folders) {
    // 임장 보고서 사진
    for (const photo of (folder.photos || [])) {
      if (photo.data) {
        await _idbPut(photo.id, folder.id, photo.data);
        delete photo.data;
        needsSave = true;
      }
    }
    // 시세 그래프 이미지
    for (const graph of (folder.graphs || [])) {
      if (graph.data) {
        await _idbPut(graph.id, folder.id, graph.data);
        delete graph.data;
        needsSave = true;
      }
    }
    // 입지분석 사진 (loc/school/env)
    const m = folder.memo || {};
    for (const key of ['loc_photo', 'school_photo', 'env_photo']) {
      if (m[key]) {
        await _idbPut(`__${key.replace('_photo','')}_${folder.id}`, folder.id, m[key]);
        delete m[key];
        needsSave = true;
      }
    }
  }
  if (needsSave) saveDB(db);
}

function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return { folders: [] };
    return JSON.parse(raw);
  } catch(e) {
    return { folders: [] };
  }
}

function _showStorageBanner() {
  let banner = document.getElementById('_storage_warn_banner');
  if (banner) return;
  banner = document.createElement('div');
  banner.id = '_storage_warn_banner';
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;background:#b91c1c;color:#fff;font-size:13px;padding:10px 16px;display:flex;align-items:center;gap:12px;box-shadow:0 2px 8px rgba(0,0,0,0.3);';
  banner.innerHTML = `
    <span style="flex:1;">⚠️ 저장 공간이 부족합니다. 방금 입력한 내용이 저장되지 않았습니다. 임장 사진이나 그래프를 삭제해 공간을 확보하세요.</span>
    <button onclick="document.getElementById('_storage_warn_banner').remove()" style="background:rgba(255,255,255,0.2);border:none;color:#fff;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:12px;">닫기</button>
  `;
  document.body.prepend(banner);
}

function _hideStorageBanner() {
  document.getElementById('_storage_warn_banner')?.remove();
}

function saveDB(db) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    _hideStorageBanner();
  } catch(e) {
    _showStorageBanner();
  }
}

// 폴더 목록 가져오기
function getFolders() {
  return loadDB().folders;
}

// 폴더 생성
function createFolder(name) {
  const db = loadDB();
  const folder = {
    id: Date.now().toString(),
    name,
    createdAt: new Date().toISOString(),
    groups: [],
    apartments: [],
    memo: { traffic: '', school: '', environment: '', notes: '' },
    photos: [],
    graphs: []
  };
  db.folders.push(folder);
  saveDB(db);
  return folder;
}

// 폴더 이름 변경
function renameFolder(folderId, newName) {
  const db = loadDB();
  const f = db.folders.find(f => f.id === folderId);
  if (f) { f.name = newName; saveDB(db); }
}

// 폴더 삭제
function deleteFolder(folderId) {
  const db = loadDB();
  db.folders = db.folders.filter(f => f.id !== folderId);
  saveDB(db);
}

// 폴더 순서 변경
function reorderFolders(orderedIds) {
  const db = loadDB();
  const map = Object.fromEntries(db.folders.map(f => [f.id, f]));
  db.folders = orderedIds.map(id => map[id]).filter(Boolean);
  saveDB(db);
}

// 폴더 가져오기
function getFolder(folderId) {
  return loadDB().folders.find(f => f.id === folderId) || null;
}

// 아파트 저장 (폴더에 추가)
function saveApartment(folderId, aptData) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (!folder) return;

  const existingIdx = folder.apartments.findIndex(a => a.name === aptData.name && a.lawdCd === aptData.lawdCd);
  const existingRecord = existingIdx >= 0 ? folder.apartments[existingIdx] : null;

  const record = {
    id: existingRecord ? existingRecord.id : Date.now().toString(),
    name: aptData.name,
    lawdCd: aptData.lawdCd,
    regionName: aptData.regionName,
    savedAt: new Date().toISOString(),
    buildYear: aptData.buildYear || null,
    areas: aptData.areas || [],
    areaStats: aptData.areaStats || [],
    trades: aptData.trades || [],
    groupId: aptData.groupId !== undefined ? (aptData.groupId || null) : (existingRecord?.groupId ?? null),
    // 수동 입력: 전달된 manual 우선, 없으면 기존 값 유지, 그도 없으면 빈 값
    manual: aptData.manual
      ? { ...(existingRecord?.manual || {}), ...aptData.manual,
          areas: { ...(existingRecord?.manual?.areas || {}), ...(aptData.manual.areas || {}) } }
      : (existingRecord?.manual || { corridorType: '', areas: {}, notes: '' })
  };

  if (existingIdx >= 0) {
    folder.apartments[existingIdx] = record;
  } else {
    folder.apartments.push(record);
  }
  saveDB(db);
  return record;
}

// 아파트 수동입력 업데이트 (deep merge)
function updateApartmentManual(folderId, aptId, patch) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (!folder) return;
  const apt = folder.apartments.find(a => a.id === aptId);
  if (!apt) return;
  if (!apt.manual) apt.manual = {};
  // patch.areas 는 특정 면적 하나의 필드만 담음 → deep merge
  if (patch.areas) {
    if (!apt.manual.areas) apt.manual.areas = {};
    for (const [area, fields] of Object.entries(patch.areas)) {
      apt.manual.areas[area] = { ...(apt.manual.areas[area] || {}), ...fields };
    }
    const { areas, ...rest } = patch;
    apt.manual = { ...apt.manual, ...rest };
  } else {
    apt.manual = { ...apt.manual, ...patch };
  }
  saveDB(db);
}

// 아파트 삭제
function deleteApartment(folderId, aptId) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (folder) {
    folder.apartments = folder.apartments.filter(a => a.id !== aptId);
    saveDB(db);
  }
}

// 지역 메모 저장
function saveMemo(folderId, memo) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (folder) { folder.memo = { ...folder.memo, ...memo }; saveDB(db); }
}

// 사진 추가 — 메타는 localStorage, 이미지 data는 IndexedDB
async function addPhoto(folderId, photoData) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (!folder) return;
  if (!folder.photos) folder.photos = [];
  const photo = {
    id: Date.now().toString(),
    name: photoData.name || '',
    caption: photoData.caption || '',
    report: photoData.report || '',
    addedAt: new Date().toISOString()
  };
  folder.photos.push(photo);
  saveDB(db);
  if (photoData.data) await _idbPut(photo.id, folderId, photoData.data);
  return photo;
}

// 사진 삭제 — localStorage 메타 + IndexedDB 데이터 모두 제거
async function deletePhoto(folderId, photoId) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (folder && folder.photos) {
    folder.photos = folder.photos.filter(p => p.id !== photoId);
    saveDB(db);
  }
  await _idbDelete(photoId);
}

// 사진 캡션 수정 (localStorage 메타만)
function updatePhotoCaption(folderId, photoId, caption) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (folder && folder.photos) {
    const photo = folder.photos.find(p => p.id === photoId);
    if (photo) { photo.caption = caption; saveDB(db); }
  }
}

// 임장 보고서 텍스트 수정 (localStorage 메타만)
function updatePhotoReport(folderId, photoId, report) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (folder && folder.photos) {
    const photo = folder.photos.find(p => p.id === photoId);
    if (photo) { photo.report = report; saveDB(db); }
  }
}

// 사진 이미지 업데이트 — IndexedDB에만 저장
async function updatePhotoData(folderId, photoId, data) {
  if (data) {
    await _idbPut(photoId, folderId, data);
  } else {
    await _idbDelete(photoId);
  }
}

// 시세 그래프 항목 추가
// 그래프 추가 — 메타는 localStorage, 이미지 data는 IndexedDB
async function addGraph(folderId, graphData) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (!folder) return;
  if (!folder.graphs) folder.graphs = [];
  const graph = {
    id: Date.now().toString(),
    report: graphData.report || '',
    addedAt: new Date().toISOString()
  };
  folder.graphs.push(graph);
  saveDB(db);
  if (graphData.data) await _idbPut(graph.id, folderId, graphData.data);
  return graph;
}

// 시세 그래프 항목 삭제 — localStorage 메타 + IndexedDB 데이터 모두 제거
async function deleteGraph(folderId, graphId) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (folder && folder.graphs) {
    folder.graphs = folder.graphs.filter(g => g.id !== graphId);
    saveDB(db);
  }
  await _idbDelete(graphId);
}

// 시세 그래프 이미지 업데이트 — IndexedDB에만 저장
async function updateGraphData(folderId, graphId, data) {
  if (data) await _idbPut(graphId, folderId, data);
  else await _idbDelete(graphId);
}

// 시세 그래프 메모 업데이트
function updateGraphReport(folderId, graphId, report) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (folder && folder.graphs) {
    const graph = folder.graphs.find(g => g.id === graphId);
    if (graph) { graph.report = report; saveDB(db); }
  }
}

// ─── 그룹 관리 ────────────────────────────────────────────────────
function createGroup(folderId, name) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (!folder) return null;
  if (!folder.groups) folder.groups = [];
  const group = { id: Date.now().toString(), name };
  folder.groups.push(group);
  saveDB(db);
  return group;
}

function renameGroup(folderId, groupId, newName) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (!folder || !folder.groups) return;
  const g = folder.groups.find(g => g.id === groupId);
  if (g) { g.name = newName; saveDB(db); }
}

function deleteGroup(folderId, groupId) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (!folder) return;
  folder.groups = (folder.groups || []).filter(g => g.id !== groupId);
  folder.apartments = (folder.apartments || []).map(a =>
    a.groupId === groupId ? { ...a, groupId: null } : a
  );
  saveDB(db);
}

function reorderGroups(folderId, orderedIds) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (!folder || !folder.groups) return;
  const map = Object.fromEntries(folder.groups.map(g => [g.id, g]));
  folder.groups = orderedIds.map(id => map[id]).filter(Boolean);
  saveDB(db);
}

function updateAptGroup(folderId, aptId, groupId) {
  const db = loadDB();
  const folder = db.folders.find(f => f.id === folderId);
  if (!folder) return;
  const apt = folder.apartments.find(a => a.id === aptId);
  if (apt) { apt.groupId = groupId || null; saveDB(db); }
}

// JSON 내보내기
async function exportJSON() {
  const db = loadDB();
  const idb = await _idbGetAll();
  const payload = { ...db, _idb: idb };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `apt-tracker-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// JSON 불러오기
function importJSON(file, onSuccess, onError) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.folders || !Array.isArray(data.folders)) throw new Error('올바르지 않은 파일 형식입니다.');
      const db = loadDB();
      data.folders.forEach(incoming => {
        const idx = db.folders.findIndex(f => f.id === incoming.id);
        if (idx >= 0) db.folders[idx] = incoming;
        else db.folders.push(incoming);
      });
      saveDB(db);
      if (data._idb) {
        await Promise.all(
          Object.entries(data._idb).map(([id, { folderId, data: imgData }]) =>
            _idbPut(id, folderId, imgData)
          )
        );
      }
      if (onSuccess) onSuccess(db);
    } catch(err) {
      if (onError) onError(err.message);
    }
  };
  reader.readAsText(file);
}
