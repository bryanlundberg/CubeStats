import { useSettingsModalStore } from "@/store/SettingsModalStore";
import ThemeSelect from "@/components/menu-settings/ThemeSelect";
import { MenuSection } from "@/components/menu-settings/MenuSection";
import { MenuOption } from "@/components/menu-settings/MenuOption";
import { DataImportExport } from "@/components/menu-settings/DataImportExport";
import { useTimerStore } from "@/store/timerStore";
import { Link } from "@/navigation";
import useEscape from "@/hooks/useEscape";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import CustomTheme from "./CustomTheme";
import { useTranslations } from "next-intl";
import MenuSelectLanguage from "./MenuSelectLanguage";
import {
  ArrowLeftIcon,
  BellAlertIcon,
  ClockIcon,
  CogIcon,
  CpuChipIcon,
  FolderIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default function MenuSettings() {
  const { settingsOpen, setSettingsOpen, settings } = useSettingsModalStore();

  const { isSolving } = useTimerStore();
  const t = useTranslations("Index.Settings-menu");

  useEscape(() => setSettingsOpen(false));

  return (
    <>
      <AnimatePresence>
        {settingsOpen && !isSolving ? (
          <div className="absolute z-10 flex w-full h-full overflow-auto">
            <motion.div
              initial={{ x: -400, opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0.6 }}
              transition={{ type: "lineal" }}
              className="flex flex-col w-full gap-3 overflow-auto bg-neutral-50 text-zinc-800 sm:w-96 light"
            >
              <div className="flex items-center my-3">
                <Link
                  href={"/"}
                  onClick={() => setSettingsOpen(false)}
                  className="flex items-center cursor-pointer ms-3"
                >
                  <ArrowLeftIcon className="w-6 h-6" />
                </Link>
                <div className="flex-1 text-2xl font-medium text-center">
                  {t("title")}
                </div>
              </div>

              <MenuSelectLanguage />

              <MenuSection
                icon={<CogIcon className="w-6 h-6" />}
                title={t("timer")}
              >
                <MenuOption
                  setting={settings.timer.inspection}
                  label={t("inspection")}
                />
                <MenuOption
                  setting={settings.timer.startCue}
                  label={t("start-cue")}
                />
                <MenuOption
                  setting={settings.timer.holdToStart}
                  label={t("hold-to-start")}
                />
                <MenuOption
                  setting={settings.timer.manualMode}
                  label={t("manual-mode")}
                />
              </MenuSection>

              <MenuSection
                icon={<CpuChipIcon className="w-6 h-6" />}
                title={t("features")}
              >
                <MenuOption
                  setting={settings.features.scrambleImage}
                  label={t("scramble-image")}
                />
                <MenuOption
                  setting={settings.features.sessionStats}
                  label={t("session-stats")}
                />
                <MenuOption
                  setting={settings.features.quickActionButtons}
                  label={t("quick-action-buttons")}
                />
                <MenuOption
                  setting={settings.features.hideWhileSolving}
                  label={t("hide-while-solving")}
                />
                <MenuOption
                  setting={settings.features.scrambleBackground}
                  label={t("scramble-background")}
                />
              </MenuSection>

              <MenuSection
                icon={<BellAlertIcon className="w-6 h-6" />}
                title={t("alerts")}
              >
                <MenuOption
                  setting={settings.alerts.bestTime}
                  label={t("best-time")}
                />
                <MenuOption
                  setting={settings.alerts.bestAverage}
                  label={t("best-average")}
                />

                <MenuOption
                  setting={settings.alerts.worstTime}
                  label={t("worst-time")}
                />
              </MenuSection>

              <MenuSection
                icon={<SparklesIcon className="w-6 h-6" />}
                title={t("theme")}
              >
                <ThemeSelect />
                <CustomTheme />
              </MenuSection>

              <MenuSection
                icon={<FolderIcon className="w-6 h-6" />}
                title={t("data")}
              >
                <DataImportExport />
              </MenuSection>
              <MenuSection
                icon={<IdentificationIcon className="w-6 h-6" />}
                title={t("about")}
              >
                <div className="flex flex-col justify-center items-center gap-3">
                  <Image
                    src={"/brand_logo.svg"}
                    alt="logo"
                    width={320}
                    height={100}
                  />

                  <div className="text-center w-11/12 italic">
                    &rdquo;{t("legend")}&rdquo;
                  </div>

                  <div className="flex gap-3 underline">
                    <Link
                      href="https://github.com/bryanlundberg/NexusTimer/issues"
                      target="_blank"
                      className="hover:text-zinc-500 text-blue-600 transition duration-300"
                    >
                      {t("suggest")}
                    </Link>
                    <Link
                      href="https://github.com/bryanlundberg/NexusTimer/issues"
                      target="_blank"
                      className="hover:text-zinc-500 text-blue-600 transition duration-300"
                    >
                      {t("report-bug")}
                    </Link>
                  </div>
                </div>
              </MenuSection>
            </motion.div>
            {/* Area to the right  -> Its a transparent layer next to menu */}
            <Link
              href={"/"}
              onClick={() => {
                setSettingsOpen(false);
              }}
              className="sm:grow cursor-default"
            ></Link>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
