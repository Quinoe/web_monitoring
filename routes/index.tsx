import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Navbar } from "../components/Navbar.tsx";
import { Sidebar } from "../components/Sidebar.tsx";
import { Menu } from "../islands/Menu.tsx";
import { OverviewCard } from "../components/OverviewCard.tsx";
import { OverviewTable } from "../components/OverviewTable.tsx";
import { Map } from "../islands/Map.tsx";
import { ClinetList } from "../islands/ClientList.tsx";
export default function Home() {
  const statuses = [
    {
      key: "total_clients",
      icon: "fa-building",
      background: "#DEF5FF",
      title: "Total clients",
      description: "lorem ipsum",
      iconBackground: "#7ABFFF",
      count: 300,
    },
    {
      key: "total_status_down",
      icon: (
        <div class="w-[18px] h-[18px]">
          <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
          </svg>
        </div>
      ),
      background: "#FFE2E5",
      title: "Down",
      description: "lorem ipsum",
      iconBackground: "#FA5A7D",
      count: 300,
    },
    {
      key: "total_status_active",
      icon: "fa-signal",
      background: "#DCFCE7",
      title: "Active",
      description: "lorem ipsum",
      iconBackground: "#3CD856",
      count: 300,
    },
    {
      key: "total_new_clients",
      icon: "fa-building",
      background: "#F3E8FF",
      title: "New clients",
      description: "lorem ipsum",
      iconBackground: "#BF83FF",
      count: 300,
    },
  ];

  return (
    <div
      className="flex gap-[20px]"
      style={{
        flexDirection: "column",
      }}
    >
      <div class="flex gap-[20px] h-full">
        <div class="bg-[white] rounded-lg p-[10px]  px-[20px] flex w-fit gap-[10px]">
          {statuses.map(
            ({
              title,
              iconBackground,
              background,
              count,
              icon,
              description,
            }) => {
              return (
                <OverviewCard
                  title={title}
                  description={description}
                  count={count}
                  icon={icon}
                  background={background}
                  iconBackground={iconBackground}
                />
              );
            }
          )}
        </div>
        <div class="bg-[white] rounded-lg flex-1 p-[10px] h-full w-[100%] px-[20px] flex w-fit gap-[10px]">
          <div class="h-[250px] w-full">
            <OverviewTable />
          </div>
        </div>
      </div>

      <div class="bg-[white] p-[10px] w-full px-[20px] flex w-fit gap-[10px] rounded-lg">
        <div className="w-[75%] bg-[transparent] h-[400px]">
          <Map />
        </div>
        <div className="w-[25%] ">
          <ClinetList />
        </div>
      </div>
    </div>
  );
}
