import { useContext } from 'react';
import {
  type SiteSettingsContextValue,
  SiteSettingsContext,
  SiteSettingsProvider,
} from './SiteSettingsContext';
import {
  type RewordContextValue,
  RewordContext,
  RewordProvider,
} from './RewordContext';

export const useSiteSettingsContext = () => useContext(SiteSettingsContext);
export const useRewordContext = () => useContext(RewordContext);

export type { SiteSettingsContextValue, RewordContextValue };
export {
  SiteSettingsContext,
  SiteSettingsProvider,
  RewordContext,
  RewordProvider,
};
