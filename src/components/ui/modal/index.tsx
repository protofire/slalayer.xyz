'use client';

import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import { useOnClickTarget } from '@/hooks/useOnClickTarget';
import { useIsClient } from '@/hooks/useIsClient';

import styles from './styles.module.css';
import { cn } from '@/lib/utils';

interface ModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  onClickOutside?: () => void;
  className?: string;
}

export default function Modal({
  children,
  isOpen = false,
  onClickOutside,
  className,
}: ModalProps) {
  const ref = useRef(null);

  const isClient = useIsClient();

  useOnClickTarget(ref, onClickOutside);

  if (!isClient) return null;

  return createPortal(
    <CSSTransition
      in={isOpen}
      nodeRef={ref}
      timeout={500}
      unmountOnExit
      classNames={{
        appear: styles.backdropEnter,
        appearActive: styles.backdropEnterActive,
        appearDone: styles.backdropEnterDone,
        enter: styles.backdropEnter,
        enterActive: styles.backdropEnterActive,
        enterDone: styles.backdropEnterDone,
        exit: styles.backdropExit,
        exitActive: styles.backdropExitActive,
        exitDone: styles.backdropExitDone,
      }}
    >
      <div className={`px-8 ${styles.backdrop} `} ref={ref}>
        <div
          className={cn(
            styles.modal,
            'min-w-[400px] min-h-[400px] max-h-[95%] overflow-auto',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.body,
  );
}
