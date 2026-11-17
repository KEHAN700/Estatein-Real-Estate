import { useClients } from '@/api/queries';
import houseImage from '@/assets/images/about-house.webp';
import { ClientCard } from '@/components/cards/ClientCard';
import { TeamCard } from '@/components/cards/TeamCard';
import { CardCarousel } from '@/components/sections/CardCarousel';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatCard } from '@/components/ui/StatCard';
import { achievements, stats, steps, team, values } from '@/data/company';
import { usePageTitle } from '@/hooks/usePageTitle';
import { pad } from '@/lib/format';
import s from './About.module.scss';

export default function About() {
  usePageTitle('About Us');
  const clients = useClients();

  return (
    <>
      <section className={`container ${s.journey}`} id="story">
        <div className={s.journeyText}>
          <SectionHeader
            as="h1"
            className={s.flatHeader}
            title="Our Journey"
            text="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients."
          />
          <dl className={s.stats}>
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </dl>
        </div>
        <div className={s.journeyImage}>
          <img src={houseImage} alt="Model of a house held on an open palm" width={755} height={546} />
        </div>
      </section>

      <section className={`container ${s.values}`}>
        <SectionHeader
          className={s.flatHeader}
          title="Our Values"
          text="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
        />
        <ul className={s.valuesCard}>
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className={s.value}>
              <div className={s.valueHead}>
                <span className={s.valueIcon}>
                  <Icon aria-hidden />
                </span>
                <h3>{title}</h3>
              </div>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${s.section}`} id="achievements">
        <SectionHeader
          title="Our Achievements"
          text="Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
        />
        <ul className={s.achievements}>
          {achievements.map((item) => (
            <li key={item.title} className={s.achievement}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${s.section}`} id="process">
        <SectionHeader
          title="Navigating the Estatein Experience"
          text="At Estatein, we've designed a straightforward process to help you find and purchase your dream property with ease. Here's a step-by-step guide to how it all works."
        />
        <ol className={s.steps}>
          {steps.map((step, i) => (
            <li key={step.title} className={s.step}>
              <p className={s.stepNumber}>Step {pad(i + 1)}</p>
              <div className={s.stepBody}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={`container ${s.section}`} id="team">
        <SectionHeader
          title="Meet the Estatein Team"
          text="At Estatein, our success is driven by the dedication and expertise of our team. Get to know the people behind our mission to make your real estate dreams a reality."
        />
        <ul className={s.team}>
          {team.map((member) => (
            <li key={member.name}>
              <TeamCard {...member} />
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${s.section}`} id="clients">
        <SectionHeader
          title="Our Valued Clients"
          text="At Estatein, we have had the privilege of working with a diverse range of clients across various industries. Here are some of the clients we've had the pleasure of serving"
        />
        <CardCarousel
          items={clients.data}
          isPending={clients.isPending}
          isError={clients.isError}
          perView={{ desktop: 2, tablet: 1, mobile: 1 }}
          className={s.clients}
          renderItem={(client) => <ClientCard client={client} />}
        />
      </section>
    </>
  );
}
