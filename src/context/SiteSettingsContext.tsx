import { PropsWithChildren, createContext, useState } from 'react';
import { BASE_SITE_TITLE } from '@app/util/config';

export interface SiteSettingsContextValue {
  /**
   * The i18n translation key `title` of the site (shown in the browser tab)
   */
  siteTitle: string;
  /**
   * Function to update the title of the site
   * @param title The new title
   */
  setSiteTitle(title: string): void;
}

const initialValue: SiteSettingsContextValue = {
  siteTitle: BASE_SITE_TITLE,
  setSiteTitle: function (_title: string): void {
    throw new Error('Function not implemented.');
  },
};

export const SiteSettingsContext = createContext(initialValue);

/**
 * Provider component for {@link SiteSettingsContext}
 */
export const SiteSettingsProvider = ({ children }: PropsWithChildren) => {
  const [siteTitle, setSiteTitle] = useState<string>(initialValue.siteTitle);
  return (
    <SiteSettingsContext.Provider value={{ siteTitle, setSiteTitle }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};
