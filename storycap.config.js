module.exports = {
  // Output directory for screenshots
  outDir: 'screenshots',
  
  // Viewport settings for different screen sizes
  viewports: {
    desktop: { width: 1200, height: 800 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 667 }
  },
  
  // Default viewport
  viewport: 'desktop',
  
  // Wait time before taking screenshot (for animations to settle)
  delay: 1000,
  
  // Include stories matching these patterns
  include: [
    '**/Button.stories.*',
    '**/InputField.stories.*',
    '**/DataTable.stories.*',
    '**/Badge.stories.*'
  ],
  
  // Exclude certain stories if needed
  exclude: [],
  
  // Browser options
  browser: 'chromium',
  
  // Screenshot options
  screenshot: {
    // Full page screenshot
    fullPage: false,
    // Clip to component area
    clip: true,
    // High quality screenshots
    quality: 90
  },
  
  // Parallel execution
  parallel: 4,
  
  // Enable dark mode screenshots too
  variants: {
    theme: {
      light: {},
      dark: {
        // Add dark class to body for dark mode screenshots
        prepare: (page) => page.evaluate(() => {
          document.body.classList.add('dark');
        })
      }
    }
  }
};
