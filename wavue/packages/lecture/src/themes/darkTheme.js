// src/themes/darkTheme.js
export const darkThemeOverrides = {
    common: {
        primaryColor: '#3b82f6',
        primaryColorHover: '#2563eb',
        primaryColorPressed: '#1d4ed8',
        primaryColorSuppl: '#60a5fa',

        infoColor: '#38bdf8',
        successColor: '#4ade80',
        warningColor: '#fbbf24',
        errorColor: '#f87171',

        fontFamily: 'Pretendard, Noto Sans KR, sans-serif',
        borderRadius: '8px',

        bodyColor: '#1e293b',
        textColorBase: '#f3f4f6',
        textColor2: '#e5e7eb',
        textColor3: '#9ca3af',
        dividerColor: '#334155',
    },

    Button: {
        borderRadius: '6px',
        fontWeight: '500',
        paddingMedium: '0 12px',
        colorHoverPrimary: '#60a5fa',
    },

    Input: {
        heightMedium: '32px',
        heightSmall: '26px',
        borderRadius: '6px',
        textColor: '#f1f5f9',
        color: '#334155',
        border: '1px solid #475569',
    },

    Card: {
        color: '#1e293b',
        colorEmbedded: '#334155',
        borderRadius: '10px',
        titleTextColor: '#f3f4f6',
    },

    Table: {
        thColor: '#334155',
        tdColor: '#1e293b',
        thTextColor: '#e5e7eb',
        tdTextColor: '#f1f5f9',
        borderColor: '#475569',
        borderRadius: '6px',
    },

    Dialog: {
        color: '#1e293b',
        titleTextColor: '#f9fafb',
        contentTextColor: '#e2e8f0',
        borderRadius: '10px',
    },
}
