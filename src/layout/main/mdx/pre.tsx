import { Box, Button, ScrollArea } from '@mantine/core';
import { IconTextWrap } from '@tabler/icons-react';
import clsx from 'clsx';
import type { ComponentProps, FC } from 'react';
import { useCallback, useRef } from 'react';

import classes from './pre.module.css';

type PreProps = ComponentProps<'pre'> & {
  filename?: string;
  hasCopyCode?: boolean;
};
import { ActionIcon, CopyButton, rem, Tooltip } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';

export const Pre: FC<PreProps> = ({
  children,
  hasCopyCode,
  filename,
  ...props
}) => {
  const preRef = useRef<HTMLPreElement | null>(null);

  const toggleWordWrap = useCallback(() => {
    const htmlDataset = document.documentElement.dataset;
    const hasWordWrap = 'infpWordWrap' in htmlDataset;
    if (hasWordWrap) {
      delete htmlDataset.infpWordWrap;
    } else {
      htmlDataset.infpWordWrap = '';
    }
  }, []);

  return (
    <div className={classes.root}>
      {filename && <div className={classes.filename}>{filename}</div>}

      <Box
        component="pre"
        className={classes.pre}
        ref={preRef as any}
        data-filename={!!filename}
        {...props}>
        {children}
      </Box>

      <Box className={classes.actions} data-filename={!!filename}>
        <Tooltip label={'Toggle word wrap'} withArrow>
          <ActionIcon variant="subtle" color="gray" onClick={toggleWordWrap}>
            <IconTextWrap style={{ width: rem(16) }} />
          </ActionIcon>
        </Tooltip>
        {hasCopyCode && (
          <CopyButton
            value={preRef.current?.querySelector('code')?.textContent || ''}
            timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow>
                <ActionIcon
                  color={copied ? 'teal' : 'gray'}
                  variant="subtle"
                  onClick={copy}>
                  {copied ? (
                    <IconCheck style={{ width: rem(16) }} />
                  ) : (
                    <IconCopy style={{ width: rem(16) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        )}
      </Box>
    </div>
  );
};
