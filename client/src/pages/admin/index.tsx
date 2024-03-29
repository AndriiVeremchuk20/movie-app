import admin from "@/api/admin";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { responseStatsData } from "@/api/types/admin";
import { isAuthed } from "@/utils/isAuthed";
import appRoutes from "@/appRoutes";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { appUserAtom } from "@/atom";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getPieChartOptions = (text: string) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: text,
        font: {
          size: 18,
        },
      },
    },
  };

  return options;
};

const getPieChartData = (
  labels: Array<string>,
  dataset: Array<number>,
  label: string
) => {
  const data = {
    labels: labels,

    datasets: [
      {
        label: label,
        data: dataset,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return data;
};

const getLineChartOptions = (text: string) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: text,
        font: {
          size: 20,
        },
      },
    },
  };

  return chartOptions;
};

const getLineChartData = (labels: Array<String>, data: Array<number>) => {
  const dataset = {
    labels: labels,
    datasets: [
      {
        label: "Watched",
        data: data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return dataset;
};

const AdminPanel = () => {
  const [statData, setStatData] = useState<responseStatsData | null>(null);
  const router = useRouter();
  const [user] = useAtom(appUserAtom);

  const getStatsMutation = useMutation(admin.getStats, {
    onSuccess(data) {
      setStatData(data);
    },
  });

  useEffect(() => {
    if (!isAuthed()) {
      router.replace(appRoutes.login);
    }
    getStatsMutation.mutate();
  }, []);

  return (
    <>
      <Head>
        <title>Admin panel</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex max-h-fit min-h-screen justify-center bg-gradient-to-r from-sky-900 to-neutral-900 ">
        <div className="mb-10 mt-24 flex h-auto justify-center bg-neutral-700 bg-opacity-50 p-9 pb-10">
          <div className=" w-[900px]">
            {statData ? (
              <>
                <Line
                  options={getLineChartOptions("Watched Data")}
                  data={getLineChartData(
                    statData?.watched.map((i) => i[0]),
                    statData?.watched.map((i) => i[1])
                  )}
                />
                <Line
                  options={getLineChartOptions("Registration Data")}
                  data={getLineChartData(
                    statData?.registrations.map((i) => i[0]),
                    statData?.registrations.map((i) => i[1])
                  )}
                />
                <div className="mt-10 text-2xl font-bold text-white">
                  Most Activity users Stats
                </div>
                <div className="flex">
                  <div>
                    <Pie
                      className="m-10"
                      options={getPieChartOptions("Watched")}
                      data={getPieChartData(
                        statData?.mostActiveUsers.map(
                          (user) => user.firstName + " " + user.lastName
                        ),
                        statData?.mostActiveUsers.map((user) => user.Watched),
                        "Watched"
                      )}
                    />
                    <Pie
                      className="m-10"
                      options={getPieChartOptions("Likes")}
                      data={getPieChartData(
                        statData?.mostActiveUsers.map(
                          (user) => user.firstName + " " + user.lastName
                        ),
                        statData?.mostActiveUsers.map((user) => user.likes),
                        "Likes"
                      )}
                    />
                  </div>
                  <div className="w-96">
                    <Pie
                      className="m-10"
                      options={getPieChartOptions("Addind to Watch Later")}
                      data={getPieChartData(
                        statData?.mostActiveUsers.map(
                          (user) => user.firstName + " " + user.lastName
                        ),
                        statData?.mostActiveUsers.map(
                          (user) => user.watchLater
                        ),
                        "Watch Later"
                      )}
                    />
                    <Pie
                      className="m-10"
                      options={getPieChartOptions("Comments")}
                      data={getPieChartData(
                        statData?.mostActiveUsers.map(
                          (user) => user.firstName + " " + user.lastName
                        ),
                        statData?.mostActiveUsers.map((user) => user.comments),
                        "Comments"
                      )}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(AdminPanel);
