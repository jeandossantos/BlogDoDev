import { useContext } from 'react';
import { TagContext } from '../contexts/TagContext';

export function useTag() {
  return useContext(TagContext);
}
