export const getAntdTheme = (isDark) => ({
  token: {
    // Primary color
    colorPrimary: '#6366f1',
    
    // Background colors
    colorBgContainer: isDark ? '#1e293b' : '#ffffff',
    colorBgElevated: isDark ? '#334155' : '#ffffff',
    colorBgLayout: isDark ? '#0f172a' : '#fbf9f9',
    
    // Text colors
    colorText: isDark ? '#f1f5f9' : '#2d3748',
    colorTextSecondary: isDark ? '#cbd5e0' : '#4a5568',
    colorTextTertiary: isDark ? '#94a3b8' : '#718096',
    
    // Border colors
    colorBorder: isDark ? '#334155' : '#e2e8f0',
    colorBorderSecondary: isDark ? '#475569' : '#cbd5e0',
    
    // Component specific
    controlItemBgActive: isDark ? '#475569' : '#edf2f7',
    controlItemBgHover: isDark ? '#334155' : '#f7fafc',
  },
  components: {
    Button: {
      colorText: isDark ? '#f1f5f9' : '#2d3748',
      colorBgTextHover: isDark ? '#334155' : '#f7fafc',
      colorBgTextActive: isDark ? '#475569' : '#edf2f7',
    },
    Input: {
      colorBgContainer: isDark ? '#334155' : '#ffffff',
      colorText: isDark ? '#f1f5f9' : '#2d3748',
      colorTextPlaceholder: isDark ? '#94a3b8' : '#718096',
      colorBorder: isDark ? '#475569' : '#e2e8f0',
    },
    Select: {
      colorBgContainer: isDark ? '#334155' : '#ffffff',
      colorText: isDark ? '#f1f5f9' : '#2d3748',
      colorBorder: isDark ? '#475569' : '#e2e8f0',
      optionSelectedBg: isDark ? '#475569' : '#edf2f7',
    },
    Card: {
      colorBgContainer: isDark ? '#1e293b' : '#ffffff',
      colorText: isDark ? '#f1f5f9' : '#2d3748',
      colorBorderSecondary: isDark ? '#334155' : '#e2e8f0',
    },
    Table: {
      colorBgContainer: isDark ? '#1e293b' : '#ffffff',
      colorText: isDark ? '#f1f5f9' : '#2d3748',
      headerBg: isDark ? '#334155' : '#f7fafc',
      rowHoverBg: isDark ? '#334155' : '#f7fafc',
    },
    Modal: {
      colorBgElevated: isDark ? '#1e293b' : '#ffffff',
      colorText: isDark ? '#f1f5f9' : '#2d3748',
      headerBg: isDark ? '#1e293b' : '#ffffff',
    },
    Drawer: {
      colorBgElevated: isDark ? '#1e293b' : '#ffffff',
      colorText: isDark ? '#f1f5f9' : '#2d3748',
    },
    Dropdown: {
      colorBgElevated: isDark ? '#1e293b' : '#ffffff',
      colorText: isDark ? '#f1f5f9' : '#2d3748',
      controlItemBgHover: isDark ? '#334155' : '#f7fafc',
    },
    Menu: {
      colorBgContainer: isDark ? '#1e293b' : '#ffffff',
      colorText: isDark ? '#f1f5f9' : '#2d3748',
      itemHoverBg: isDark ? '#334155' : '#f7fafc',
      itemSelectedBg: isDark ? '#475569' : '#edf2f7',
    },
    Form: {
      labelColor: isDark ? '#f1f5f9' : '#2d3748',
    },
    Radio: {
      colorText: isDark ? '#f1f5f9' : '#2d3748',
      colorBgContainer: isDark ? '#334155' : '#ffffff',
    },
    Switch: {
      colorTextTertiary: isDark ? '#94a3b8' : '#718096',
    },
    Tag: {
      colorText: isDark ? '#f1f5f9' : '#2d3748',
      colorBgContainer: isDark ? '#334155' : '#f7fafc',
      colorBorder: isDark ? '#475569' : '#e2e8f0',
    },
    Progress: {
      colorText: isDark ? '#f1f5f9' : '#2d3748',
    },
    Avatar: {
      colorTextPlaceholder: isDark ? '#f1f5f9' : '#2d3748',
      colorBgContainer: isDark ? '#334155' : '#e2e8f0',
    },
  },
}); 