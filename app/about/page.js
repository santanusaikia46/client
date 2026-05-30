import styles from "../info.module.css";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <h1>Welcome to Tati Assam</h1>
        <p className={styles.heroSub}>
          If you're here, you're definitely curious about the enchanting journey we are on– and we're thrilled to spill the beans on our journey! No time to waste, let's dive right in and take you on a ride through our story...
        </p>
      </div>

      <div className={styles.containerWide}>
        {/* WHO ARE WE? */}
        <section style={{ marginBottom: '5rem' }}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>WHO ARE WE?</h2>
          <p className={styles.prose} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            TATI is a homegrown ethical brand weaving stories to redefine traditional values for the new age men and women. We're on a mission to catapult Assam's textile legacy onto the world's fashion landscape while preserving ancient techniques that have stood the test of time. By blending time-honored skills of our ancestors with contemporary design, we're flipping the script on luxury, and redefining it with the touch of tradition, social consciousness and eco-friendliness. Our ultimate goal is to showcase the jaw-dropping beauty, finest qualities of craftmanship and the unique charm of Assam’s handmade textiles while building a socially responsible brand that connects heritage with the future. Behind each Tati garment is a story - of the artisan's craft, the handloom's journey, the inspiration from tradition. Our designs may be contemporary, but our soul is traditional.
          </p>
        </section>

        {/* HOW IT ALL STARTED? */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>HOW IT ALL STARTED?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p className={styles.prose}>
                I was in 8th standard when I realized that I wanted to go to fashion school... Coming from a small town, something's seemed far from reality back then. The journey from enrolling myself into one and figuring out how to go about it took years of mistakes and lessons and I am still on my learning journey... I went in search of the world outside but the world made me look within. Within my culture, within my values.
              </p>
              <br/>
              <p className={styles.prose}>
                There was a time I recall feeling lost in fashion school...I pondered upon my quest and purpose of being there. I dragged my ambiguous self to college every day until I was introduced to ethical fashion. I realized how certain age-old cultural practices are ethical enough and how incredibly lucky I am to have such a strong cultural background.
              </p>
              <br/>
              <p className={styles.prose}>
                Art is a self-expression and individuality is a person's reality. It really helps one find their true self and shapes their perspective. The fashion industry is one of the most progressive industries in the world... It accepts you irrespective of your caste, religion, sexuality, gender, color etc. I spent months thinking about how I could use what I have to work for the benefit of others. There was one thing I was sure of and that was "If I were to invest my time and energy doing something, I would work for the less privileged and give them the benefit of what I have learnt."
              </p>
              <br/>
              <p className={styles.prose}>
                My roots grounded me to my culture and I came home trying to seek what I had found. Handloom, an age-old tradition in every Assamese household, was last followed by my grandmother in the family. This practice was almost relinquished at home and today I find my purpose in bringing back the same practice. My quest lies in preserving my cultural practice, promoting it and using my abilities to work for the needy.
              </p>
              <p className={styles.prose} style={{ fontWeight: 'bold', marginTop: '1.5rem' }}>
                ⦁ Silpita Gogoi (Founder and Designer)
              </p>
            </div>
            <div style={{ position: 'relative', height: '600px', borderRadius: '24px', overflow: 'hidden' }}>
              <Image src="https://res.cloudinary.com/dsnsthnae/image/upload/v1780129959/tatiassam/q1bysp8fqjiqmynyptgj.avif" alt="Our Journey" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        {/* OUR VALUES */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '4rem' }}>OUR VALUES</h2>
          
          {/* SOCIAL RESPONSIBILITY */}
          <div style={{ marginBottom: '5rem' }}>
            <h3 style={{ fontSize: '1.8rem', color: '#394B3F', marginBottom: '1.5rem' }}>SOCIAL RESPONSIBILITY</h3>
            <p className={styles.prose}>
              When I was studying in fashion school, I had the privilege to learn about the country’s diverse craft and I was almost stunned and surprised to find out that every state in India had a craft of their own centered around the community’s need and choice of art in respect to the availability of resources found in their geographical regions. It was almost as if I was taken through a diverse cultural voyage through slides of presentations and what interestingly stood out to me was how less information was available on northeastern crafts as the information would end in 5-6 slides whereas crafts from other states had an informational with a total of 20-22 slides. There were limited books on the college library on northeastern textiles. Even though it has been researched by many cultural pioneers, it told me a lot about our cultural exposure and recognition of artisans in the wider fashion landscape. That was when my outlook to my own people and craft changed. I was certain about exploring areas of Assam where women were sitting with a generational talent but did not have the exposure to the market. And that required me to go into the most rural parts of the state and train people to try not just new designs but also to challenge their thinking patterns in order to finish a project.
            </p>
            <br/>
            <p className={styles.prose}>
              Despite possessing unmatched skills honed over generations, these artisans struggled for recognition. Their local markets were dwindling as machine-made textiles gained prominence. Talented female weavers sat idle at home with no work. An entire cultural heritage of our region was slowly fading away. Hence, we make a commitment to traditional artisans by providing a platform for their craft, to women by creating economic opportunity, and to customers by offering thoughtfully designed garments made with organic resources. Our unique focus on ethical production and community empowerment sets us apart from mass-market brands. Our purpose is to showcase the beauty of traditional textiles while creating economic opportunities for skilled but overlooked artisans.
            </p>
            <br/>
            <p className={styles.prose} style={{ fontWeight: '500' }}>
              We're not just making clothes; we're making commitments. To traditional artisans, we offer a stage for their craft. To women, we create economic opportunities. To clients, we deliver the essence of Assam.
            </p>
          </div>

          {/* SUSTAINABILITY */}
          <div>
            <h3 style={{ fontSize: '1.8rem', color: '#394B3F', marginBottom: '1.5rem' }}>SUSTAINABILITY</h3>
            <p className={styles.prose}>
              Today, much of sustainable fashion is challenged by a demanding supply chain trend by a fast-paced world and driven by people’s materialistic mindset of never having enough. Our approach to creating exquisite fabrics stands in stark contrast to today’s rapid production cycles. We take you to a slow but organic way of living.
            </p>
            <br/>
            <p className={styles.prose}>
              A capitalistic mindset is often driven by wanting more but there comes a point when you realize that subtle handmade luxury was what ROYALTIES preferred in ancient times and it was made by the finest set of craftsmen. This very luxury has a value that is unmatched to what we call luxury in the present times.
            </p>
            <br/>
            <p className={styles.prose}>
              Handloom, in itself, is an ethical and sustainable practice. For centuries, this ethical practice was the cornerstone of fabric production in India, with indigenous communities in Assam weaving with their own hands and using only local resources, free from machinery. It’s both remarkable and humbling that these ancient practices still continue to thrive in the rural corners of Assam today. Our aim is to revive and preserve these time-honored methods. By staying true to the same practices and tools used by artisans of the past, we ensure that our products not only honor the heritage of handloom weaving but also contribute to a more sustainable future. Here’s how we’re redefining luxury with a conscientious touch:
            </p>
          </div>
        </section>

        {/* RAW MATERIALS */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '4rem' }}>RAW MATERIALS</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
            {/* YARNS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', height: '350px', borderRadius: '16px', overflow: 'hidden' }}>
                <Image src="https://res.cloudinary.com/dsnsthnae/image/upload/v1780129992/tatiassam/ptymjq2vd2qgwli2wgnr.avif" alt="Locally sourced, hand-extracted yarns" fill style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#394B3F', marginBottom: '1rem' }}>YARNS</h3>
                <p className={styles.prose}>
                  Our mission is rooted in harnessing the beauty of locally sourced, hand-extracted yarns. Currently, we work with Eri fiber, one of three indigenous fibers from the region, alongside Muga and Nooni, which we plan to incorporate in the near future. As machine-made alternatives have become more prevalent, these traditional fibers have grown increasingly rare. To honor their legacy, we embark on a journey through villages, sourcing yarn directly from local artisans. This approach ensures that each piece not only supports craftsmanship but also uplifts the communities that sustain these remarkable resources.
                </p>
              </div>
            </div>

            {/* DYES */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#394B3F', marginBottom: '1rem' }}>DYES</h3>
                <p className={styles.prose}>
                  Blessed with abundant natural resources, our state offers a vibrant palette of local dyes that we incorporate into our fabrics. Historically, local communities used these natural dyes, derived from tree barks, leaves, and fruits, to color their textiles. Each dye brings out unique hues, reflecting the rich, natural beauty of the region.
                </p>
              </div>
              <div style={{ position: 'relative', height: '350px', borderRadius: '16px', overflow: 'hidden' }}>
                <Image src="https://res.cloudinary.com/dsnsthnae/image/upload/v1780130022/tatiassam/aefducuc7q6uh3vvqtoh.avif" alt="Natural dyes derived from tree barks, leaves, and fruits" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* LOOMS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', height: '350px', borderRadius: '16px', overflow: 'hidden' }}>
                <Image src="https://res.cloudinary.com/dsnsthnae/image/upload/v1780130051/tatiassam/uum7eyjtgym2rhqrp1iv.avif" alt="Manual throw shuttle loom" fill style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: '#394B3F', marginBottom: '1rem' }}>LOOMS</h3>
                <p className={styles.prose}>
                  This is one of the ways we choose to stay unique as a brand. The fabrics woven are made in an ancient loom called the Manual throw shuttle loom. In most areas of Assam, the use of this loom is only limited to the people of the village who still perform weaving as a way of life. Most of these looms are replaced by manual jacquard looms by manufacturers to amplify production speed. The manual throw shuttle loom is an original way of making fabrics in the olden times but also has its own limitations in terms of the design explorations.
                </p>
                <br/>
                <p className={styles.prose}>
                  While it offers limited design flexibility, our goal is to push its boundaries and explore its full creative potential. This manual loom, with its rich heritage, operates entirely without electricity, reflecting a bygone era of slow living and patience. This dedication to craftsmanship not only makes our fabrics remarkably sustainable but also deeply ethical.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DESIGN */}
        <section style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h2 className={styles.sectionTitle}>DESIGN</h2>
            <p className={styles.prose}>
              Assam's rich history is a tapestry of diverse arts and crafts, from intricate tools to exquisite textiles. Amongst these were the art and craftmanship performed on textiles that was much preferred by Royalties. The motifs in Assamese textiles were inspired from the flora and fauna in the region.
            </p>
            <br/>
            <p className={styles.prose}>
              Our brand reimagines these traditional patterns through a contemporary, minimalist lens, preserving the essence of Assamese craftsmanship while introducing a modern twist. The juxtaposition of traditional motifs with a harmonious palette of colors yield’s the look of a contemporary design aspect. By blending classic motifs with a refined color palette, we create designs that embody subtle luxury.
            </p>
            <br/>
            <p className={styles.prose}>
              Assamese clothing has mostly been centered around rich traditional garments. Our vision is to elevate this heritage into a high-end ready-to-wear brand that seamlessly merges cultural identity with sustainable fashion. The defining point of our brand is that we strive to offer a new kind of luxury—one that is both timeless and eco-conscious.
            </p>
          </div>
          <div style={{ position: 'relative', height: '500px', borderRadius: '16px', overflow: 'hidden' }}>
            <Image src="https://res.cloudinary.com/dsnsthnae/image/upload/v1780130157/tatiassam/d2vpiczmfbt9a5niugt2.avif" alt="Contemporary minimalist lens preserving Assamese craftsmanship" fill style={{ objectFit: 'cover' }} />
          </div>
        </section>
      </div>
    </main>
  );
}
