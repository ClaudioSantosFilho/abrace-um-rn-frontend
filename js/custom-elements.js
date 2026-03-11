// Entry point for all Atomic Design components
const atomicComponents = [
  '/src/components/atoms/app-button/app-button.js',
  '/src/components/molecules/social-links/social-links.js',
  '/src/components/molecules/form-field/form-field.js',
  '/src/components/organisms/app-header/app-header.js',
  '/src/components/organisms/app-footer/app-footer.js'
];

atomicComponents.forEach(src => {
  if (!document.querySelector(`script[src*="${src}"]`)) {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'module';
    document.head.appendChild(script);
  }
});
