// @flow
import styles from './Administrate.css';
import React from 'react';
import { Flex } from 'app/components/Layout';
import Tooltip from 'app/components/Tooltip';
import cx from 'classnames';
import LoadingIndicator from 'app/components/LoadingIndicator';
import type {
  EventRegistrationChargeStatus,
  EventRegistrationPresence,
  ID
} from 'app/models';

type TooltipIconProps = {
  onClick?: (SyntheticInputEvent<*>) => mixed,
  content: string,
  transparent?: boolean,
  iconClass: string
};

type PresenceProps = {
  handlePresence: (ID, EventRegistrationPresence) => Promise<*>,
  presence: EventRegistrationPresence,
  id: ID
};

type UnregisterProps = {
  fetching: boolean,
  handleUnregister: ID => void,
  id: ID,
  clickedUnregister: ID
};

type StripeStatusProps = {
  id: ID,
  handlePayment: (
    registrationId: ID,
    chargeStatus: EventRegistrationChargeStatus
  ) => Promise<*>,
  chargeStatus: EventRegistrationChargeStatus
};

export const TooltipIcon = ({
  onClick,
  content,
  transparent,
  iconClass
}: TooltipIconProps) => {
  return (
    <Tooltip className={styles.cell} content={content}>
      <a className={cx(transparent && styles.transparent)} onClick={onClick}>
        <i className={iconClass} />
      </a>
    </Tooltip>
  );
};

export const PresenceIcons = ({
  handlePresence,
  presence,
  id
}: PresenceProps) => {
  return (
    <Flex className={styles.presenceIcons}>
      <TooltipIcon
        content="Til stede"
        iconClass={cx('fa fa-check', styles.greenIcon)}
        transparent={presence !== 'PRESENT'}
        onClick={() => handlePresence(id, 'PRESENT')}
      />
      <TooltipIcon
        content="Ukjent"
        iconClass={cx('fa fa-question-circle', styles.questionIcon)}
        transparent={presence !== 'UNKNOWN'}
        onClick={() => handlePresence(id, 'UNKNOWN')}
      />
      <TooltipIcon
        content="Ikke til stede"
        iconClass={cx('fa fa-times', styles.crossIcon)}
        transparent={presence !== 'NOT_PRESENT'}
        onClick={() => handlePresence(id, 'NOT_PRESENT')}
      />
    </Flex>
  );
};

export const StripeStatus = ({
  id,
  handlePayment,
  chargeStatus
}: StripeStatusProps) => (
  <Flex className={styles.presenceIcons}>
    <TooltipIcon
      content="Betalt stripe"
      iconClass={cx('fa fa-cc-stripe', styles.greenIcon)}
      transparent={chargeStatus !== 'succeeded'}
    />
    <TooltipIcon
      content="Betalt manuelt"
      transparent={chargeStatus !== 'manual'}
      iconClass={cx('fa fa-money', styles.greenIcon)}
      onClick={() => handlePayment(id, 'manual')}
    />
    <TooltipIcon
      content="Ikke betalt"
      transparent={['manual', 'succeeded'].includes(chargeStatus)}
      iconClass={cx('fa fa-times', styles.crossIcon)}
      onClick={() => handlePayment(id, 'failed')}
    />
  </Flex>
);

export const Unregister = ({
  fetching,
  handleUnregister,
  id,
  clickedUnregister
}: UnregisterProps) => {
  return (
    <div>
      {fetching ? (
        <LoadingIndicator loading={true} small />
      ) : (
        <a onClick={() => handleUnregister(id)}>
          <i
            className="fa fa-minus-circle"
            style={{ color: '#C24538', marginRight: '5px' }}
          />
          {clickedUnregister === id ? 'Er du sikker?' : 'Meld av'}
        </a>
      )}
    </div>
  );
};
