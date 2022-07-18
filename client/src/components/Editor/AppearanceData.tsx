export default function AppearanceData() {
  const colorSetData = [
    {
      label: "블루 컬러 세트",
      value: {
        primary: "#5754DE",
        secondary: "#ABA9FF",
        background: "#FFFFFF",
        surface: "#B0B0B0",
      },
    },
    {
      label: "블랙 컬러 세트",
      value: {
        primary: "#000000",
        secondary: "#3B3B3B",
        background: "#FFFFFF",
        surface: "#B0B0B0",
      },
    },
    {
      label: "옐로우 컬러 세트",
      value: {
        primary: "#FFE400",
        secondary: "#FFF289",
        background: "#FFFFFF",
        surface: "#B0B0B0",
      },
    },
    {
      label: "그린 컬러 세트",
      value: {
        primary: "#009D24",
        secondary: "#96CAA2",
        background: "#FFFFFF",
        surface: "#B0B0B0",
      },
    },
  ];

  const fontData = [
    {
      label: "Roboto",
      value: "Roboto",
    },
    {
      label: "East Sea Dokdo",
      value: "East Sea Dokdo",
    },
    {
      label: "Nanum Gothic",
      value: "Nanum Gothic",
    },
    {
      label: "Nanum Myeongjo",
      value: "Nanum Myeongjo",
    },
    {
      label: "Noto Sans KR",
      value: "Noto Sans KR",
    },
    {
      label: "Noto Serif KR",
      value: "Noto Serif KR",
    },
    {
      label: "Song Myung",
      value: "Song Myung",
    },
    {
      label: "Elice Digital Baeum",
      value: "Elice Digital Baeum",
    },
  ];

  const themeData = [
    {
      label: "Minimal",
      value: "Minimal",
    },
    {
      label: "Simple",
      value: "Simple",
    },
    {
      label: "Resume",
      value: "Resume",
    },
  ];

  return { colorSetData, fontData, themeData };
}
