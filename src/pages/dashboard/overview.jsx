import Chart from "chart.js/auto";
import { DateTime } from "luxon";
import React, { useState, useEffect, useRef } from "react";
import DashboardTemplate from "../../components/DashboardTemplate";
import api from "../../utils/api";
import titleCase from "../../utils/titleCase";

function Overview({ headerTitleAction }) {
  useEffect(() => {
    headerTitleAction("Overview");
  }, [headerTitleAction]);

  const [projects, setProjects] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.instance.get("/projects");

        setProjects(res.data);
      } catch (error) {
        // alert("An error accured");
      }
    })();
  }, []);

  const chartRef = useRef();
  const doughnutRef = useRef();

  useEffect(() => {
    if (chartRef.current && projects) {
      const ctx = chartRef.current.getContext("2d");

      const labels = Array.from(
        { length: DateTime.now().daysInMonth },
        (_, i) => i + 1
      );

      const globalInbox = [];

      projects.map((project) => {
        project.forms.map((form) => {
          form.inbox.map((inbox) => {
            globalInbox.push(inbox);
          });
        });
      });

      const data = [];

      labels.map((label) => {
        data.push({
          x: label,
          y: globalInbox
            .map((inbox) => {
              if (
                DateTime.fromObject({
                  year: DateTime.now().year, // This year
                  month: DateTime.now().month, // This month
                  day: label, // Day of month
                }).toFormat("D") ===
                DateTime.fromISO(inbox.created).toFormat("D")
              ) {
                return true;
              }
            })
            .filter((value) => value).length,
        });
      });

      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              backgroundColor: "hsla(232, 100%, 61%, 0.75)",
              borderColor: "hsla(232, 100%, 61%, 0.75)",
              data: data,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    if (doughnutRef.current && projects) {
      const ctx = doughnutRef.current.getContext("2d");

      const labels = projects.map((project) => titleCase(project.name));

      const data = projects.map((project) =>
        project.forms
          .map((form) => form.inbox.length)
          .reduce((previous, current) => previous + current)
      );

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              // backgroundColor: labels.map((label) => random_rgba()), // "hsla(232, 100%, 61%, 0.75)",
              // borderColor: random_rgba(), // "hsla(232, 100%, 61%, 0.75)",
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              data: data,
            },
          ],
        },
        // options: {
        //   plugins: {
        //     legend: {
        //       display: false,
        //     },
        //   },
        // },
      });
    }
  }, [chartRef, projects]);

  return (
    <DashboardTemplate>
      <div id="overview">
        <section id="overview__charts">
          <h2>monthly engagement</h2>
          <div id="overview__charts__container">
            <div>
              <canvas ref={chartRef}></canvas>
            </div>
            <div>
              <canvas ref={doughnutRef}></canvas>
            </div>
          </div>
        </section>
        <section id="overview__recommended">
          <h2>recommended for you</h2>
          <main>
            <article>
              <h3>
                5 Tips to Increase the Conversion Rate of Your Landing Page
              </h3>
              <small>By: Guest Blogger - February 1, 2018</small>
              <p>
                Landing pages are very important to your lead generation
                strategy. This is why a lot of marketers and business owners
                spend their time driving traffic to their web pages, hoping that
                it will convert. On average, a good landing page will convert
                between 1 percent and 3 percent. However, some companies convert
                in the double digits...
              </p>
            </article>
            <article>
              <h3>6 Tips To Gain User Engagement With A Landing Page</h3>
              <small>By: Emma Coffinet - February 23, 2022</small>
              <p>
                In this article we present you with the six most important tips
                on how to boost user engagement with your landing pages. How do
                you build a high-converting landing page? It is a question that
                boggles the mind of every marketer out there, but only the elite
                players actually manage to figure out the answer. User
                engagement has always been a pain point in digital marketing,
                particularly if you know that the average landing page
                conversion rate is 2.35%....
              </p>
            </article>
            <article>
              <h3>How to Design Email Landing Pages</h3>
              <small>By: By Drift - August 19th, 2021</small>
              <p>
                After all these years, 50% of customers still say email is their
                preferred communication channel for connecting with brands,
                making the inbox the perfect place to drive conversions. While
                email marketing has been a part of the digital conversation for
                decades, email landing pages don’t get as much play on marketing
                blogs and white papers as the email itself. But great emails
                alone don’t make a campaign. To drive conversions from those
                emails, you’ll need to push your audience in the right direction
                so that they complete the desired action–be it a purchase,
                webinar registration, download, or something else....
              </p>
            </article>
            <article>
              <h3>How to Get More Landing Page Engagement in 2021</h3>
              <small>By: Syed Balkhi - January 25th, 2021</small>
              <p>
                As we approach the end of the first month of 2021, many business
                leaders are still trying to fine-tune their marketing strategies
                for the rest of the year. Landing pages are among the most
                frequently used sales tools for companies across all industries
                and a hot topic in the marketing community. Essentially, a
                landing page is a specific page on your website designed to give
                consumers more information about your products, services, or
                events. Marketers use landing pages to get more webinar signups,
                direct sales, email subscribers, and more.....
              </p>
            </article>
          </main>
        </section>
      </div>
    </DashboardTemplate>
  );
}

export default Overview;
