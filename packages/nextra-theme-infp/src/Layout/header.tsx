import { observer } from '@legendapp/state/react';
import React from 'react';

import { Anchor } from '@/components/anchor';
import { ThemeSwitch } from '@/components/theme-switch';
import { useIsAtTop } from '@/hooks/use-is-at-top';
import { store } from '@/store';
import { renderComponent } from '@/utils/render';
import { cn } from '@/utils/utils';

export const Logo = observer(() => {
  const header = store.themeConfig.header.get();
  const { logoLink, logo } = header;

  return logoLink ? (
    <Anchor
      href={typeof logoLink === 'string' ? logoLink : '/'}
      className="flex items-center justify-self-start hover:opacity-75 ltr:mr-auto rtl:ml-auto">
      {renderComponent(logo)}
    </Anchor>
  ) : (
    <div className="flex items-center justify-self-start ltr:mr-auto rtl:ml-auto">
      {renderComponent(logo)}
    </div>
  );
});

export const Menu = observer(() => {
  return (
    <div className="flex flex-1 sticky top-0 items-center justify-end overflow-hidden">
      <div
        className={cn(
          'hidden md:flex items-center justify-start h-9 rounded-full overflow-x-auto no-scrollbar',
        )}>
        {new Array(8).fill(
          <span className="mx-2 whitespace-nowrap">编程</span>,
        )}
      </div>
    </div>
  );
});

export const Header = observer(() => {
  const isAtTop = useIsAtTop();

  return (
    <div className="infp-header-container">
      <div
        className={cn(
          'infp-header-container-blur',
          'pointer-events-none absolute z-[-1] h-full w-full bg-white dark:bg-dark',
          !isAtTop &&
            'transition-[box-shadow] shadow-[0_2px_4px_rgba(0,0,0,.02),0_1px_0_rgba(0,0,0,.06)] dark:shadow-[0_-1px_0_rgba(255,255,255,.1)_inset]',
          'contrast-more:shadow-[0_0_0_1px_#000] contrast-more:dark:shadow-[0_0_0_1px_#fff]',
        )}
      />
      <nav className="mx-auto flex h-[var(--infp-header-height)] max-w-[90rem] items-center justify-end gap-2 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        <Logo />
        <Menu />
        <ThemeSwitch lite />
      </nav>
    </div>
  );
});
