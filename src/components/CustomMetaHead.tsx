import type { FC, ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

// const Canonical = () => {
//   const { getCanonicalUrl } = useCanonicalUrl();
//   return (
//     <Fragment key="canonical">
//       <link rel="canonical" href={getCanonicalUrl()} />
//     </Fragment>
//   );
// };

interface CustomHeadProps {
  children: ReactNode;
}

const CustomHead: FC<CustomHeadProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  const language = locale || "en";

  return (
    <>
      <Helmet>
        <meta httpEquiv="content-language" content={language} />
        {/* {!withCustomCanonical && Canonical()} */}
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
        {children}
      </Helmet>
    </>
  );
};

export default CustomHead;
