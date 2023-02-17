import React from "react";
import ReactSelect from "react-select";
import { Box } from "@mui/system";
import { birthstoneOptions } from "@/components/parts/BirthstoneSelect";
import { MaterialType } from "@/features/types";

const options = [
  ...birthstoneOptions,
  { value: "Crystal", label: "クリスタル（水晶）" },
  { value: "RoseQuarts", label: "ローズクォーツ" },
  { value: "LemonQuarts", label: "レモンクォーツ" },
  { value: "Aventurine", label: "アベンチュリン" },
  { value: "Jade", label: "ヒスイ（ジェード）" },
  {
    value: "Chalcedony",
    label: "カルセドニー（アゲート、ジャスパー、メノウ、オニキス）",
  },
  { value: "LapisLazuli", label: "ラピスラズリ" },
  { value: "Malachite", label: "マラカイト" },
  { value: "Serpentine", label: "ニュージェイド" },
  { value: "Hematite", label: "ヘマタイト" },
  { value: "Fluorite", label: "フローライト" },
  { value: "Kunzite", label: "クンツアイト" },
  { value: "Pearl", label: "パール（真珠）" },
  { value: "Rhodonite", label: "ロードナイト" },
  { value: "Sodalite", label: "ソーダライト" },
  { value: "Sunstone", label: "サンストーン" },
  { value: "Morganite", label: "モルガナイト" },
  { value: "Beryl", label: "ベリル" },
  { value: "Prehnite", label: "プレナイト" },
  { value: "Larimar", label: "ラリマー" },
  { value: "Charoite", label: "チャロアイト" },
  { value: "Sugilite", label: "スギライト" },
  { value: "Incarose", label: "インカローズ" },
  { value: "Ametrine", label: "アメトリン" },
  { value: "Labradorite", label: "ラブラドライト" },
  { value: "Amber", label: "アンバー（琥珀）" },
  { value: "MotherOfPearl", label: "マザーオブパール" },
];

const sortedOptions = [
  ...options.sort((a, b) => a.label.localeCompare(b.label)),
  { value: "Other", label: "その他" },
];

type Props = {
  setMaterial: React.Dispatch<React.SetStateAction<MaterialType>>;
};

const MaterialSelect = ({ setMaterial }: Props) => {
  return (
    <Box sx={{ width: "100%", mb: 1 }}>
      <ReactSelect
        onChange={(e) => setMaterial([...e])}
        options={sortedOptions}
        isMulti={true}
      />
    </Box>
  );
};

export default MaterialSelect;
