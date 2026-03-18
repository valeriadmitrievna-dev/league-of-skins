import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[calc(100vh-106px)] flex-col items-center justify-center bg-background text-foreground px-6">
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">404</h1>

        <p className="text-lg text-muted-foreground">{t("app.page-doesnt-exist")}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="secondary" onClick={() => window.history.back()}>
            {t("app.go-back")}
          </Button>

          <Link to="/">
            <Button>{t("app.go-home")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
