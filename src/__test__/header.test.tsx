import { render, screen, fireEvent } from '@testing-library/react';
import AppHeader from '@/components/header';


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));


const setPropertyMock = jest.fn();
document.documentElement.style.setProperty = setPropertyMock;




test('toggles mode when mode button is clicked', () => {
  const mockToggleMode = jest.fn();
  const mockHandleChangeLanguage = jest.fn();

  render(
    <AppHeader
      isAwake={true}
      toggleMode={mockToggleMode}
      handleChangeLanguage={mockHandleChangeLanguage}
    />
  );

  const modeButton = screen.getByLabelText('Mode Toggle');
  fireEvent.click(modeButton);


  expect(mockToggleMode).toHaveBeenCalledTimes(1);
});


test('applies the correct theme and CSS class based on isAwake', () => {
      const mockToggleMode = jest.fn();
      const mockHandleChangeLanguage = jest.fn();
    
   
      render(
        <AppHeader
          isAwake={true}
          toggleMode={mockToggleMode}
          handleChangeLanguage={mockHandleChangeLanguage}
        />
      );
     
      expect(document.body.getAttribute('data-theme')).toBe('light');
      expect(document.querySelector('.header-awake')).toBeInTheDocument();
    
   
      render(
        <AppHeader
          isAwake={false}
          toggleMode={mockToggleMode}
          handleChangeLanguage={mockHandleChangeLanguage}
        />
      );

      expect(document.body.getAttribute('data-theme')).toBe('dark');
      expect(document.querySelector('.header-asleep')).toBeInTheDocument();
    });

    test('displays the translated header name', () => {
      const mockToggleMode = jest.fn();
      const mockHandleChangeLanguage = jest.fn();
    
      render(
        <AppHeader
          isAwake={true}
          toggleMode={mockToggleMode}
          handleChangeLanguage={mockHandleChangeLanguage}
        />
      );
    
 
      expect(screen.getByText('Intellisphere')).toBeInTheDocument();
    });

