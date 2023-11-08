import Image from "next/image";

// この配列は通常は動的に生成されるべきですが、Next.jsのサーバーサイドではファイルシステムにアクセスできないため、
// 静的なリストを用意するか、API経由でサーバーサイドでリストを取得する必要があります。
const imagePaths = [];

for (let i = 0; i < 89; i++) {
  imagePaths.push("/img/small/chiri-" + String(i + 1) + ".png");
}

export const DynamicImageComponent = () => {
  return (
    <div style={{ display: "none" }}>
      {/* 表示される画像と、事前に読み込む画像 */}
      <div>
        {imagePaths.map((path) => (
          <Image
            key={path}
            src={path}
            alt="Preloaded image"
            // priority={true}
            width={300}
            height={300}
          />
        ))}
      </div>
    </div>
  );
};
