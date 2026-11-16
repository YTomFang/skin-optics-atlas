/*
 * All article content lives in this single registry. No HTML in fields.
 * Before adding/editing, read AGENTS.md + docs/NEW_ARTICLE_TEMPLATE.md.
 * Each slug becomes a shareable page: article.html?slug=<slug>
 */
window.ATLAS_CATEGORIES = {
  layer: "皮膚分層", modality: "光學模態", ai: "AI 影像", workflow: "研究流程"
};
window.ATLAS_ENTRIES = [
  {
    slug: "rcm", category: "modality", title: "反射式共軛焦顯微術", titleEn: "Reflectance Confocal Microscopy · RCM",
    summary: "利用組織反向散射光形成光學切片，觀察皮膚表皮與淺層真皮的微細構造。",
    lead: "RCM 是一種非侵入式光學顯微成像技術，藉由針孔與共軛焦設計抑制失焦光訊號，呈現皮膚細胞及組織的橫向光學切片。",
    readMins: 4, keywords: ["共軛焦", "反射", "散射", "針孔", "confocal"],
    highlight: "重點：RCM 的主要對比來源是組織不同結構造成的背向散射與折射率差異。",
    sections: [
      {heading: "基本成像原理", paragraphs: ["雷射照射組織後，部分光受到微結構散射並回到接收端。與焦平面共軛的針孔可阻擋較多離焦光，使影像呈現光學切片效果。", "RCM 通常以接近皮膚表面平行方向的 en face 影像觀察結構；連續調整焦深後，可形成深度序列（Z-stack）。"], bullets: []},
      {heading: "在皮膚中可以看到什麼？", paragraphs: ["RCM 可觀察表皮細胞形態、角質層與顆粒層的紋理，以及部分表皮與真皮交界形態。不同組織的散射對比會隨深度與皮膚位置而變化。"], bullets: ["表皮：細胞輪廓、明暗紋理與組織排列。", "基底層附近：可能觀察到與色素及微結構有關的散射訊號。", "淺層真皮：可見部分纖維和其他組織結構，深度受散射影響。"]},
      {heading: "優勢與限制", paragraphs: ["RCM 不需要傳統組織切片即可取得細胞尺度的形態資訊，適合重複觀察；但影像對比受折射率、散射、焦深與組織特性影響，深層訊號通常較弱。", "RCM 並不能直接提供 SHG 的膠原專一性結構對比，這也是多模態成像值得研究的原因。"], bullets: []}
    ],
    references: [{label: "Automating RCM image analysis: a review (2022)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9309100/"}, {label: "Reflectance Confocal Microscopy of Skin In Vivo", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5575825/"}],
    related: ["shg", "thg", "z-stack"]
  },
  {
    slug: "shg", category: "modality", title: "二倍頻顯微影像", titleEn: "Second-Harmonic Generation · SHG",
    summary: "利用非線性光學訊號凸顯具非中心對稱結構的物質，常用於觀察真皮膠原纖維。",
    lead: "SHG 是一種非線性光學現象：兩個相同頻率的入射光子產生一個頻率加倍的光子，因此產生波長約為入射光一半的訊號。",
    readMins: 4, keywords: ["二倍頻", "非線性", "膠原", "collagen", "harmonic"],
    highlight: "重點：在皮膚研究中，SHG 對具有有序結構的膠原纖維特別有用。",
    sections: [
      {heading: "為什麼會產生 SHG？", paragraphs: ["在適當的材料對稱性與強光場條件下，非線性極化會產生兩倍於入射頻率的光。SHG 不等同於一般螢光，訊號形成的物理機制不同。"], bullets: ["入射頻率：f。", "二倍頻訊號：2f，對應波長約為原來的 1/2。", "訊號受材料結構、偏振與成像條件影響。"]},
      {heading: "真皮膠原觀察", paragraphs: ["真皮含有大量膠原纖維，其排列與方向在 SHG 影像中可提供清楚的結構資訊。研究可進一步評估纖維密度、方向性與組織分布。"], bullets: []},
      {heading: "搭配其他模態", paragraphs: ["SHG 強於纖維性結構對比，THG 則對光學不連續處敏感；兩者配合 RCM 可幫助理解皮膚不同深度的組織形態。"], bullets: []}
    ],
    references: [{label: "Recent Advancements in Optical Harmonic Generation Microscopy", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10521653/"}, {label: "Multiscale investigation of collagen structure in human skin (2025)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12144187/"}],
    related: ["thg", "skin-pd", "skin-rd"]
  },
  {
    slug: "thg", category: "modality", title: "三倍頻顯微影像", titleEn: "Third-Harmonic Generation · THG",
    summary: "藉由三階非線性光學訊號，突出細胞膜、脂質與其他光學性質不連續的介面。",
    lead: "THG 的輸出光頻率是入射光的三倍，對應波長約為三分之一。它的影像對比對折射率與非線性光學性質的空間變化特別敏感。",
    readMins: 4, keywords: ["三倍頻", "介面", "細胞膜", "脂質", "third harmonic"],
    highlight: "重點：THG 常用於呈現細胞與組織介面，但不是單一細胞種類的專用標記。",
    sections: [
      {heading: "訊號從哪裡來？", paragraphs: ["在高峰值光強下，介質的三階非線性響應可產生三倍頻訊號；當光學參數在空間上快速變化時，常出現較強的介面對比。"], bullets: ["入射頻率：f。", "三倍頻訊號：3f。", "常見對比：脂質／水介面、細胞內外構造及折射率變化。"]},
      {heading: "皮膚影像的形態線索", paragraphs: ["THG 可用於觀察表皮細胞形態與不同深度的組織分布；不同層次之間的細胞大小、排列與介面密度可以作為人工判讀的輔助線索。"], bullets: []},
      {heading: "常見誤解", paragraphs: ["THG 的亮度不能直接等同於細胞數量，因為訊號還受到光學介面、激發與收光條件等影響。實際研究應搭配其他模態及文獻驗證。"], bullets: []}
    ],
    references: [{label: "Recent Advancements in Optical Harmonic Generation Microscopy", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10521653/"}, {label: "Determination of chronological aging parameters by in vivo HGM", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3539190/"}],
    related: ["shg", "skin-sb", "rcm"]
  },
  {
    slug: "skin-sc", category: "layer", title: "角質層 SC", titleEn: "Stratum Corneum · SC",
    summary: "皮膚最外側屏障，主要由角質細胞與細胞間脂質組成。",
    lead: "角質層是表皮最外層，參與抵抗外界刺激與減少水分散失。它由成熟的角質細胞與脂質結構組成。",
    readMins: 2, keywords: ["角質", "屏障", "corneum", "表皮"],
    highlight: "觀察提示：角質層位於最淺處，形態與訊號會受到水分、表面狀態及成像模態影響。",
    sections: [
      {heading: "解剖位置與功能", paragraphs: ["SC 位於最表面，可視為皮膚的第一道屏障。與活細胞層相比，角質層的細胞已完成角化，形態與組成不同。"], bullets: ["位置：表皮最外層。", "功能：屏障、降低水分散失。"]},
      {heading: "成像觀察重點", paragraphs: ["在表面光學影像中可能出現較強的界面與表面紋理；需避免將亮度直接解讀成組織厚度。"], bullets: []}
    ],
    references: [{label: "NCBI Bookshelf — Epidermis", url: "https://www.ncbi.nlm.nih.gov/books/NBK470464/"}], related: ["skin-sg", "thg"]
  },
  {
    slug: "skin-sg", category: "layer", title: "顆粒層 SG", titleEn: "Stratum Granulosum · SG",
    summary: "角質形成細胞逐漸角化的表皮層次，具有角質透明顆粒等特徵。",
    lead: "顆粒層位於角質層之下、棘狀層之上，是表皮細胞逐漸成熟、形成屏障的過渡區域。",
    readMins: 2, keywords: ["顆粒", "角化", "granulosum", "表皮"],
    highlight: "觀察提示：SG 的表皮細胞形態與角化特徵可提供分層線索，但不同成像方式對比不相同。",
    sections: [
      {heading: "主要特徵", paragraphs: ["顆粒層的角質形成細胞通常呈較扁平形態，細胞中具有與角化有關的顆粒結構。"], bullets: ["位置：角質層下、棘狀層上。", "功能：參與角化與皮膚屏障形成。"]},
      {heading: "影像判讀提醒", paragraphs: ["皮膚分層應綜合深度、細胞形態與相鄰層連續性判斷，不能僅憑單一明亮區域下結論。"], bullets: []}
    ],
    references: [{label: "NCBI Bookshelf — Epidermis", url: "https://www.ncbi.nlm.nih.gov/books/NBK470464/"}], related: ["skin-sc", "skin-ss"]
  },
  {
    slug: "skin-ss", category: "layer", title: "棘狀層 SS", titleEn: "Stratum Spinosum · SS",
    summary: "表皮中的多層角質形成細胞，細胞間具有緊密連結。",
    lead: "棘狀層位於顆粒層與基底層之間，細胞之間的橋粒連結有助於維持表皮結構。",
    readMins: 2, keywords: ["棘狀", "橋粒", "spinosum", "表皮"],
    highlight: "觀察提示：可搭配細胞形態、排列及深度資訊，區分 SS 與其上下相鄰層。",
    sections: [
      {heading: "細胞與組織", paragraphs: ["SS 包含多層多角形角質形成細胞，細胞之間藉由橋粒等結構相互連接，協助表皮維持機械穩定性。"], bullets: []},
      {heading: "影像線索", paragraphs: ["在具有細胞輪廓對比的影像中，可以觀察不同大小與排列的細胞群；然而層次界線通常需要依賴連續深度影像確認。"], bullets: []}
    ],
    references: [{label: "NCBI Bookshelf — Histology, Skin", url: "https://www.ncbi.nlm.nih.gov/books/NBK537325/"}], related: ["skin-sg", "skin-sb"]
  },
  {
    slug: "skin-sb", category: "layer", title: "基底層 SB", titleEn: "Stratum Basale · SB",
    summary: "表皮最深處，含有持續增生的角質形成細胞及黑色素細胞。",
    lead: "基底層是表皮與真皮交界附近的重要區域，負責提供新的角質形成細胞，並包含黑色素細胞等組織成分。",
    readMins: 3, keywords: ["基底層", "黑色素", "basale", "表皮真皮交界"],
    highlight: "觀察提示：基底層附近的細胞與散射對比具有特色，但不能以單一影像直接斷言細胞種類。",
    sections: [
      {heading: "解剖與位置", paragraphs: ["SB 位於表皮最深處，鄰近基底膜與真皮。此處含有持續分裂增生的角質形成細胞，也有黑色素細胞參與色素形成。"], bullets: []},
      {heading: "為什麼是重要的影像層次？", paragraphs: ["SB 附近的組織形態與表皮真皮交界有關。在 RCM 與 THG 研究中，可能利用細胞形狀、散射及介面對比取得區分層次的線索。", "僅憑亮點與暗區判定特定細胞容易過度解釋，需要搭配連續深度影像及參考標準。"], bullets: []}
    ],
    references: [{label: "NCBI Bookshelf — Epidermis", url: "https://www.ncbi.nlm.nih.gov/books/NBK470464/"}, {label: "RCM analysis: a review", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9309100/"}], related: ["skin-ss", "skin-pd", "rcm"]
  },
  {
    slug: "skin-pd", category: "layer", title: "乳突真皮 PD", titleEn: "Papillary Dermis · PD",
    summary: "鄰近表皮的淺層真皮，結締組織較疏鬆，與表皮緊密互動。",
    lead: "乳突真皮位於真皮上層，靠近表皮真皮交界，含有結締組織、微血管及其他支持性結構。",
    readMins: 2, keywords: ["乳突真皮", "真皮", "papillary", "collagen"],
    highlight: "觀察提示：進入真皮後，SHG 膠原纖維訊號可成為重要的結構資訊來源。",
    sections: [
      {heading: "結構特徵", paragraphs: ["PD 是較淺的真皮層，其結締組織相對疏鬆，與表皮構成複雜的交界。不同身體部位的厚度與形態有所差異。"], bullets: []},
      {heading: "光學影像觀察", paragraphs: ["真皮的膠原結構可產生 SHG 對比；RCM 也可能觀察到部分淺層真皮結構，但成像深度與品質取決於系統與組織。"], bullets: []}
    ],
    references: [{label: "NCBI Bookshelf — Epidermis / Dermis", url: "https://www.ncbi.nlm.nih.gov/books/NBK470464/"}, {label: "SHG/THG microscopy overview", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10521653/"}], related: ["skin-rd", "shg", "skin-sb"]
  },
  {
    slug: "skin-rd", category: "layer", title: "網狀真皮 RD", titleEn: "Reticular Dermis · RD",
    summary: "較深、較厚的真皮區域，包含密集的膠原束與其他結締組織。",
    lead: "網狀真皮是位於乳突真皮下方的深層真皮部分，通常有更緻密的纖維性結締組織。",
    readMins: 2, keywords: ["網狀真皮", "膠原束", "reticular", "dermis"],
    highlight: "觀察提示：RD 的膠原結構適合由 SHG 研究，但可觀察深度取決於影像系統。",
    sections: [
      {heading: "組織與功能", paragraphs: ["RD 主要由緻密不規則結締組織構成，膠原纖維束提供皮膚抗拉強度，與皮膚機械特性有關。"], bullets: []},
      {heading: "影像研究價值", paragraphs: ["SHG 可呈現真皮膠原纖維的排列與方向；若要比較不同深度的 SHG 影像，應注意訊號衰減與成像參數的一致性。"], bullets: []}
    ],
    references: [{label: "NCBI Bookshelf — Histology, Skin", url: "https://www.ncbi.nlm.nih.gov/books/NBK537325/"}, {label: "Collagen SHG microscopy study", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12144187/"}], related: ["skin-pd", "shg"]
  },
  {
    slug: "ai-reconstruction", category: "ai", title: "AI 影像分割與重建", titleEn: "Image Segmentation & Reconstruction",
    summary: "認識分割、跨模態影像重建與常見評估指標，避免把模型生成內容誤認為真實訊號。",
    lead: "AI 可協助整理顯微影像中的組織區域，也可學習不同光學模態之間的影像映射；但模型輸出必須經過適當驗證。",
    readMins: 5, keywords: ["深度學習", "U-Net", "GAN", "cGAN", "PSNR", "SSIM", "IoU", "segmentation"],
    highlight: "重要提醒：AI 生成影像是推論結果，不等同於實際量測的光學訊號，更不能直接作為診斷依據。",
    sections: [
      {heading: "兩種常見研究任務", paragraphs: ["影像分割（Segmentation）嘗試將每個像素或體素指派到指定類別，例如皮膚層次。影像重建（Reconstruction）則嘗試由輸入影像估計另一種表徵，例如品質改善或跨模態轉換。"], bullets: ["分割：U-Net / 3D U-Net 等模型能利用空間與深度特徵。", "生成與重建：cGAN 等方法可用條件輸入訓練影像映射。", "任何模型都需要獨立測試資料與失敗案例分析。"]},
      {heading: "常見評估指標", paragraphs: ["PSNR 常用於衡量像素誤差程度，SSIM 著重比較局部結構相似性；IoU 可衡量分割區域與標註區域的重疊程度。", "高 PSNR 或 SSIM 並不保證生成影像保存了正確的組織形態，應搭配跨樣本驗證與領域專家檢查。"], bullets: ["PSNR：峰值訊號雜訊比，數值大小依資料尺度而定。", "SSIM：結構相似性指標。", "IoU：交集面積（或體積）／聯集面積（或體積）。"]},
      {heading: "資料管理與倫理", paragraphs: ["訓練、驗證、測試資料應避免同一受試者或高度相依影像不當跨組分配而造成資料洩漏。對活體資料，還需特別注意移動造成的配對失準。", "本知識站只有通用教育性說明，未上傳任何受試者影像。"], bullets: []}
    ],
    references: [{label: "RCM image analysis review (2022)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9309100/"}, {label: "U-Net original paper (2015)", url: "https://arxiv.org/abs/1505.04597"}, {label: "pix2pix conditional GAN paper (2017)", url: "https://arxiv.org/abs/1611.07004"}],
    related: ["z-stack", "rcm", "shg"]
  },
  {
    slug: "z-stack", category: "workflow", title: "Z-stack 與多模態資料流程", titleEn: "Depth Stacks & Multimodal Workflow",
    summary: "從深度掃描、通道對齊到品質檢查，建立可重複使用的影像處理思路。",
    lead: "Z-stack 是沿深度方向取得的影像序列，讓研究者從單張平面影像延伸到體積資訊；多通道資料則需要一致的對齊與紀錄。",
    readMins: 4, keywords: ["Z-stack", "掃描", "對齊", "配準", "registration", "影像品質"],
    highlight: "工作流原則：先保存原始資料，再進行明確可追溯的影像處理與品質檢查。",
    sections: [
      {heading: "基本流程", paragraphs: ["依照研究設計決定視野、掃描步距、影像尺寸與通道配置；擷取後記錄必要的設備條件，以利重現與比較。"], bullets: ["擷取：保存各深度與通道的原始影像。", "品質控制：檢查飽和、橫向偏移、運動偽影與訊號強度。", "配準：記錄通道或時間序列間的空間對齊方式。", "分析：保留處理版本與原始檔之間的追溯關係。"]},
      {heading: "常見誤差來源", paragraphs: ["活體影像可能受到身體移動、呼吸或裝置振動影響，不同通道若取像時間不同，也可能失去精確的逐像素對應。", "任何跨模態模型訓練前，都應先評估資料配對品質與資料分割策略。"], bullets: []},
      {heading: "如何建立可擴充的紀錄？", paragraphs: ["可為每次資料擷取保存共同的 metadata 欄位，例如採集日期、成像模態、掃描尺寸、深度步距、匿名樣本代碼與品質備註。不要在公開網站保存可識別個資。"], bullets: []}
    ],
    references: [{label: "RCM of skin in vivo: optical sectioning and depth stacks", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5575825/"}, {label: "Automating RCM image analysis: a review", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9309100/"}], related: ["ai-reconstruction", "rcm", "thg"]
  }
];
