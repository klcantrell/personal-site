import React from 'react';
import { Link } from 'gatsby';

import Icon from './icon';

import style from '../styles/menu.module.css';

export interface MenuItem {
  path: string;
  title: string;
}

interface MainMenuProps {
  mainMenu: Array<MenuItem>;
  mainMenuItems?: number;
  isMobileMenu?: boolean;
}

const MainMenu = ({
  mainMenu,
  mainMenuItems = 0,
  isMobileMenu = false,
}: MainMenuProps) => {
  const menu = mainMenu.slice(0);
  !isMobileMenu && menu.splice(mainMenuItems);

  return (
    <>
      {menu.map((menuItem: MenuItem, index) => (
        <li key={index}>
          <Link to={menuItem.path}>{menuItem.title}</Link>
        </li>
      ))}
    </>
  );
};

interface SubMenuProps {
  mainMenu: Array<MenuItem>;
  mainMenuItems: number;
  onToggleSubMenu: () => void;
}

const SubMenu = ({
  mainMenu,
  mainMenuItems,
  onToggleSubMenu,
}: SubMenuProps) => {
  const menu = mainMenu.slice(mainMenuItems);

  const items = menu.map((menuItem: MenuItem, index) => (
    <li key={index}>
      <Link to={menuItem.path}>{menuItem.title}</Link>
    </li>
  ));

  return (
    <>
      {items}
      <div
        className={style.subMenuOverlay}
        role="button"
        tabIndex={0}
        onClick={onToggleSubMenu}
      />
    </>
  );
};

const menuIcon = `M4 34H40V30H4V34ZM4 24H40V20H4V24ZM4 10V14H40V10H4Z`;
const toggleIcon = `M 152.77,315.36
C 229.84,278.14 252.00,249.33 252.00,229.39
  252.00,216.53 243.14,209.00 228.97,209.00
  205.48,209.00 171.38,227.17 134.61,264.39
  134.61,264.39 107.58,404.00 107.58,404.00
  107.58,404.00 81.89,404.00 81.89,404.00
  81.89,404.00 141.69,95.22 141.69,95.22
  141.69,95.22 168.27,93.00 168.27,93.00
  168.27,93.00 139.48,240.02 139.48,240.02
  175.36,203.48 212.58,185.00 240.92,185.00
  265.95,185.00 280.00,199.03 280.00,219.64
  280.00,248.44 253.08,281.69 185.11,315.36
  185.11,315.36 269.50,401.78 269.50,401.78
  269.50,401.78 239.44,406.00 239.44,406.00
  239.44,406.00 152.77,315.36 152.77,315.36 Z`;

interface MenuProps {
  mainMenu: Array<MenuItem>;
  mainMenuItems: number;
  menuMoreText: string;
  isMobileMenuVisible: boolean;
  isSubMenuVisible: boolean;
  onToggleMobileMenu: () => void;
  onToggleSubMenu: () => void;
  onChangeTheme: () => void;
}

const Menu = ({
  mainMenu,
  mainMenuItems,
  menuMoreText,
  isMobileMenuVisible,
  isSubMenuVisible,
  onToggleMobileMenu,
  onToggleSubMenu,
  onChangeTheme,
}: MenuProps) => {
  const isSubMenu = !(mainMenuItems >= mainMenu.length) && mainMenuItems > 0;

  return (
    <>
      <div className={style.mobileMenuContainer}>
        <>
          {isMobileMenuVisible ? (
            <>
              <ul className={style.mobileMenu}>
                <MainMenu mainMenu={mainMenu} isMobileMenu />
              </ul>
              <div
                onClick={onToggleMobileMenu}
                className={style.mobileMenuOverlay}
              />
            </>
          ) : null}
          <button
            className={style.menuTrigger}
            style={{ color: 'inherit' }}
            onClick={onToggleMobileMenu}
            type="button"
            aria-label="Menu"
          >
            <Icon
              style={{ cursor: 'pointer' }}
              size={24}
              d={menuIcon}
              viewBox="0 0 48 48"
            />
          </button>
        </>
      </div>
      <div className={style.desktopMenuContainer}>
        <ul className={style.menu}>
          <MainMenu mainMenu={mainMenu} mainMenuItems={mainMenuItems} />
          {isSubMenu ? (
            <>
              <button
                className={style.subMenuTrigger}
                onClick={onToggleSubMenu}
                type="button"
                aria-label="Menu"
              >
                {menuMoreText || 'Menu'}{' '}
                <span className={style.menuArrow}>&gt;</span>
              </button>
              {isSubMenuVisible ? (
                <ul className={style.subMenu}>
                  <SubMenu
                    mainMenu={mainMenu}
                    mainMenuItems={mainMenuItems}
                    onToggleSubMenu={onToggleSubMenu}
                  />
                </ul>
              ) : null}
            </>
          ) : null}
        </ul>
      </div>
      <button
        className={style.themeToggle}
        onClick={onChangeTheme}
        type="button"
        aria-label="Theme toggle"
      >
        <Icon
          style={{ cursor: 'pointer' }}
          size={48}
          d={toggleIcon}
          viewBox="0 0 352 512"
        />
      </button>
    </>
  );
};

export default Menu;
