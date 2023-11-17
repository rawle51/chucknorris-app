import { useState, useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

import { formatTime } from './utils';

interface TimerProps {
  interval: number;
  callback: () => Promise<void> | void;
}

export const Timer = ({ interval, callback }: TimerProps) => {
  const [time, setTime] = useState(interval);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;

        if (newTime === 0) {
          callback();
        }

        if (prevTime === 0) {
          return interval;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [interval, callback]);

  return (
    <Flex justify="flex-end">
      <Heading as="h3">{formatTime(time)}</Heading>
    </Flex>
  );
};
