import { Box } from "@mui/system";
import React from "react";
import ReactSelect from "react-select";
import { MaterialType } from "../../features/types";

type Props = {
  setBirthstone: React.Dispatch<React.SetStateAction<MaterialType>>;
};

const BirthstoneSelect = ({ setBirthstone }: Props) => {
  return (
    <Box sx={{ width: "100%", mb: 1 }}>
      {/* <ReactSelect
        onChange={(e) => setBirthstone([...e])}
        options={birthstoneOptions}
        isMulti={true}
      /> */}
    </Box>
  );
};

export default BirthstoneSelect;

export const birthstoneOptions = [
  { value: "Garnet", label: "ガーネット(1月)" },
  { value: "Amethyst", label: "アメジスト(2月)" },
  { value: "Aquamarine", label: "アクアマリン(3月)" },
  { value: "Coral", label: "サンゴ(3月)" },
  // { value: "Iolite", label: "アイオライト(3月)" },
  { value: "Diamond", label: "ダイヤモンド(4月)" },
  // {value:"Morganite", label:"モルガナイト(4月)"},
  // { value: "Crystal", label: "クリスタル(4月)" },
  { value: "Emerald", label: "エメラルド(5月)" },
  // { value: "Jade", label: "ヒスイ(5月)" },
  { value: "Pearl", label: "パール(6月)" },
  { value: "Alexandrite", label: "アレキサンドライト(6月)" },
  { value: "Moonstone", label: "ムーンストーン(6月)" },
  { value: "Ruby", label: "ルビー(7月)" },
  { value: "Peridot", label: "ペリドット(8月)" },
  { value: "Spinel", label: "スピネル(8月)" },
  // { value: "Sardonyx", label: "サードニクス(8月)" },
  { value: "Sapphire", label: "サファイア(9月)" },
  // {value:"Kunzite", label:"クンツァイト(9月)"},
  { value: "Opal", label: "オパール(10月)" },
  { value: "Tourmaline", label: "トルマリン(10月)" },
  { value: "Topaz", label: "トパーズ(11月)" },
  { value: "Citrine", label: "シトリン(11月)" },
  { value: "Turquoise", label: "ターコイズ(12月)" },
  { value: "Zircon", label: "ジルコン(12月)" },
  { value: "Tanazite", label: "タンザナイト(12月)" },
  // { value: "Lapis", label: "ラピスラズリ(12月)" },
];
