'use client';

import CustomNavbar from '@/components/navbar';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import '/app/pages-styles.css';
// import './real_madrid.js';
import SquadAgeBarVis from '@/components/squadAgeBarVis.tsx';
import PlayerAgeMinsChart from '@/components/playerAgeMinsChart.tsx';
import dataAgeMins from './dummy_data2.json';
import dataPlayerAgeMins from "/app/real-madrid/dummy_json_new2.json";

const RealMadridArticlePage = () => {
  const coloursDict = {
  highlight: "#FEBE10",
  text_axes: "#1e1e1e",
  muted_text: "#00529F",
};
const fontsDict = { body: "Barlow", header: "Changa" };
  
    return (
    <>
      <Head>
        <title>Article title</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
          charSet="UTF-8"
        />
      </Head>

      <CustomNavbar/>

      <Container fluid className="article">
        <h1>The renewal of Real Madrid</h1>
        <p><i>3 July 2022</i></p>
        <p>
          The Santiago Bernabéu stadium is old. Work started on it when the
          Second World War was still ongoing late in 1944. It's currently
          undergoing renovation, the latest in a once-per-generation line of
          building work to bring it up-to-date with modern times.
        </p>
        <p>
          Real Madrid's midfield is old. Luka Modrić, Toni Kroos, and Casemiro
          formed the base of it this past season, each of them now in their
          thirties (albeit Casemiro only just). They're currently on the brink
          of a renovation, a once-per-footballing-generation piece of work to
          bring the team up-to-date with modern times.
        </p>
        <p>You can practically see the cranes.</p>
        <p>
          Of course, it's not just that trio of midfielders. Karim Benzema is
          also getting on, and some key defenders are definitely in 'not getting
          any younger' territory. All together, close to half of their minutes
          in all competitions this season were played by players past their
          'peak' years.
        </p>
        <SquadAgeBarVis graphId='graph-2021' seasonId={2021} receivedData={dataAgeMins} coloursDict={coloursDict} fontsDict={fontsDict}/>
        <p>
          'Peak years' is used here in the football analytics way - the idea
          that, as a general rule, there are a period of years when players'
          physical and intellectual powers marry together. After that they may
          get smarter, but their bodies usually can't keep up like they used to.
        </p>
        <p>
          This isn't really a marker of how well individual players are playing,
          it's more of a tool for squad planning. 'Post-peak' players might
          still be performing well, but they'll be at an age where a sudden
          drop-off wouldn't exactly be a surprise. For this article, I've taken
          a baseline 'peak age' period of 24-28 (inclusive), and knocked it back
          or moved it forward for position groups which are particularly
          explosive (or not). (e.g. for full-backs it's 23 to 27; for
          goalkeepers it's 26-30).
        </p>
        {/* Maybe I could write some html to do an expandable dropdown or something for more information on the work people have done on peak ages */}
        <p>
          The thing about Real Madrid is that they've been skirting this 'peak
          age' squad construction problem for quite a while now. This is what
          their division looked like in 2017/18.
        </p>
        {/* If I manage to  do something with expandable sections, I'd love one here about my contention that the 2017/18 season is the start of the 'current era' of men's elite European football */}
        <SquadAgeBarVis graphId='graph-2017' seasonId={2017} receivedData={dataAgeMins} coloursDict={coloursDict} fontsDict={fontsDict}/>
        <p>
          It's a better distribution, but still a third of minutes being played
          by players who'll be moaning to each other about back pain. The
          'post-peak' group featured most of the team's core too: Sergio Ramos,
          Karim Benzema, Luka Modrić, Cristiano Ronaldo, Marcelo. A few of these
          were only on the brink of this article's 'post-peak' definition, but
          it's still enough to make you think 'some squad renewal is needed'.
        </p>
        <p>
          <i>Some</i> renewal did happen. Out of that 2017/18 'post-peak' group,
          Cristiano Ronaldo left for Juventus, and Marcelo and Gareth Bale both
          saw their minutes drop year after year (although perhaps for slightly
          different reasons). Modrić and Benzema are still hanging in there
          though, and until 2020/21 it looked like Sergio Ramos might never
          leave too.
        </p>

        {/* <div id="mins-graph"></div> */}
        <PlayerAgeMinsChart graphId='mins-graph' playersList={["Luka Modrić", "Karim Benzema", "Sergio Ramos", "Marcelo", "Gareth Bale"]} receivedData={dataPlayerAgeMins} coloursDict={coloursDict} fontsDict={fontsDict}/>
        <p>
          Over the next few seasons, as players like Kroos, Lucas Vázquez, and
          Nacho aged into the 'post-peak' group, and some of the existing elder
          statesmen hung around,the share of minutes played by the back pain
          crew rose and rose.
        </p>
        <SquadAgeBarVis graphId='graph-2018' seasonId={2018} receivedData={dataAgeMins} coloursDict={coloursDict} fontsDict={fontsDict}/>
        <SquadAgeBarVis graphId='graph-2019' seasonId={2019} receivedData={dataAgeMins} coloursDict={coloursDict} fontsDict={fontsDict}/>
        <SquadAgeBarVis graphId='graph-2020' seasonId={2020} receivedData={dataAgeMins} coloursDict={coloursDict} fontsDict={fontsDict}/>
        <p>
          The two seasons of 2019/20 and 2020/21 looked particularly bad from a
          squad-building point of view because of the lack of youngsters coming
          through. Federico Valverde and Vinicius Júnior were the only two to
          break 1800 minutes in all competitions, the equivalent of 20 full
          matches. And this is Real Madrid, a team going deep in cup
          competitions, where there's plenty of opportunity for gametime.
        </p>
        <p>
          And so we arrive back at this past season. A season which, from a
          squad-construction point of view, might actually be the most promising
          that Madrid have had in a long time.
        </p>
        <SquadAgeBarVis graphId='graph-2021-repeat' seasonId={2021} receivedData={dataAgeMins} coloursDict={coloursDict} fontsDict={fontsDict}/>
        <p>
          Vinicius and Éder Militao were both regular starters. Fede Valverde
          had his most-involved season to date. Eduardo Camavinga might have
          only been a rotation option/supersub for most of the campaign, but it
          looks like he'll be ready to play a much bigger role in 2022/23.
        </p>
        <p>
          They've also signed 22-year-old Aurélien Tchouameni. The path to
          renewing the central midfield, which has hung around together playing
          the same number of minutes each year for half a decade, is now clear.
        </p>
        <PlayerAgeMinsChart graphId='mins-graph-midfield' playersList={["Luka Modrić", "Toni Kroos", "Casemiro"]} receivedData={dataPlayerAgeMins} coloursDict={coloursDict} fontsDict={fontsDict}/>
        <h2>The ones who got left behind</h2>
        <p>
          The fact that this squad renewal has taken so long isn't to do with
          the quality of young players Real Madrid have had available to them.
          These are the five 'pre-peak' players who played the most minutes in
          2017/18.
        </p>
        <ul>
          <li>Raphaël Varane</li>
          <li>Marco Asensio</li>
          <li>Mateo Kovačić</li>
          <li>Theo Hernández</li>
          <li>Achraf Hakimi</li>
        </ul>
        <p>
          Varane became a regular, of course. But full-backs Hernández and
          Hakimi, both teenagers that season, have had to find success
          elsewhere. So too has Kovačić. All three have won trophies at their
          new clubs.
        </p>
        <p>
          The only one who hasn't become a key player <i>somewhere</i> is Marco
          Asensio - maybe he would've done too if he hadn't stuck around.
        </p>
        <PlayerAgeMinsChart graphId='mins-graph-asensio' playersList={["Marco Asensio"]} receivedData={dataPlayerAgeMins} coloursDict={coloursDict} fontsDict={fontsDict}/>
        <p>
          One out of the five made the first team, one out of the five stuck
          around and has stayed a handy rotation option, three of the five moved
          on in their early twenties and won silverware. It's not like they
          would never be good enough, it just... wasn't the right time. What
          makes it seem even more ridiculous is that now, at considerable
          expense, Madrid are buying in players like Camavinga and Tchouameni,
          who are that same age Hakimi, Hernández, and Kovačić were in 2017/18,
          to finally bring the process of squad renewal into full effect.
        </p>
        <p>
          It might be maddening, and it might feel like it shouldn't work, but
          it looks like it might. The Real Madrid men's team might, once again,
          be about to pull something out of the hat at the last moment.
        </p>
        <hr className="dotted" />
        <p style={{fontSize: '10pt'}}>
          <i>This piece was a bit of a project to put into use, and improve,
            some html/js/d3 knowledge I've been picking up. Please be kind about
            any issues on that side, and let me know if you encounter any
            problems.</i>
        </p>
      </Container>
    </>
  );
};

export default RealMadridArticlePage;
