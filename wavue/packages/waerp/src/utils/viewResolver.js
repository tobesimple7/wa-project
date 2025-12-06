// ✅ 화면코드(code)에 따라 해당 Vue 파일을 반환하는 매핑 유틸
// - 다양한 입력형태("home", "/home", "party/party010") 모두 안전처리
// - 등록되지 않은 코드일 때 placeholder 컴포넌트 반환 (에러 방지)



export function resolveViewByCode(code) {
    if (!code) return null

    // ✅ 1️⃣ 경로 정리: 앞뒤 슬래시, 중간 슬래시, 공백 제거
    code = String(code)
        .trim()
        .replace(/^\/+|\/+$/g, '') // 앞뒤 슬래시 제거
        .replace(/\//g, '') // 중간 슬래시 제거 (예: "party/party010" → "party010")

    const upper = code.toUpperCase()

    // ✅ 2️⃣ 코드별 수동 매핑 (현재는 메뉴 수 적을 때 가장 효율적)
    const viewMap = {
        // 공통
        HOME: () => import('@/views/HomeView.vue'),

        // 회계 (Accounting)
        FA010: () => import('@/views/accounting/Fa010.vue'),
        FA011: () => import('@/views/accounting/Fa011.vue'),
        FA020: () => import('@/views/accounting/Fa020.vue'),
        FA030: () => import('@/views/accounting/Fa030.vue'),
        FA040: () => import('@/views/accounting/Fa040.vue'),
        FA050: () => import('@/views/accounting/Fa050.vue'),
        FA060: () => import('@/views/accounting/Fa060.vue'),
        FA070: () => import('@/views/accounting/Fa070.vue'),
        FA080: () => import('@/views/accounting/Fa080.vue'),
        FA090: () => import('@/views/accounting/Fa090.vue'),
        FA100: () => import('@/views/accounting/Fa100.vue'),
        FA110: () => import('@/views/accounting/Fa110.vue'),
        FA120: () => import('@/views/accounting/Fa120.vue'),

        // 인사 (Party)
        PARTY010: () => import('@/views/party/Party010.vue'),
        PARTY011: () => import('@/views/party/Party011.vue'),
        PARTY020: () => import('@/views/party/Party020.vue'),
        PARTY030: () => import('@/views/party/Party030.vue'),
        PARTY040: () => import('@/views/party/Party040.vue'),
        PARTY050: () => import('@/views/party/Party050.vue'),
        PARTY060: () => import('@/views/party/Party060.vue'),
        PARTY070: () => import('@/views/party/Party070.vue'),
        PARTY080: () => import('@/views/party/Party080.vue'),
        PARTY090: () => import('@/views/party/Party090.vue'),
        PARTY100: () => import('@/views/party/Party100.vue')
    }

    // ✅ 3️⃣ 등록된 코드이면 해당 컴포넌트 반환
    if (viewMap[upper]) {
        return viewMap[upper]
    }

    // ✅ 4️⃣ 등록되지 않은 경우 - 경고 후 fallback 컴포넌트 반환
    console.warn(`⚠️ 등록되지 않은 화면코드: ${upper}`)

    // placeholder 컴포넌트 반환 (Vue 오류 방지)
    //return () => import('@/views/_errors/NotFoundPlaceholder.vue')
}
