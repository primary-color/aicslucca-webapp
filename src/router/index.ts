import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const tournamentsPage = () => import("@/views/TournamentsPage.vue");
const tournamentHomePage = () => import("@/views/TournamentHome.vue");
const tournamentDashboardPage = () => import("@/views/tournament/TournamentDashboardPage.vue");
const tournamentRankingsPage = () => import("@/views/tournament/TournamentRankingPage.vue");
const tournamentPlayersStatsPage = () => import("@/views/tournament/TournamentPlayersStatsPage.vue");
const tournamentCalendarPage = () => import("@/views/tournament/TournamentCalendarPage.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "RootPage",
    redirect: "/tournaments",
  },
  {
    path: "/tournaments",
    name: "TournamentsPage",
    component: tournamentsPage,
  },
  {
    path: "/tournaments/:id",
    name: "TournamentHome",
    component: tournamentHomePage,
    redirect: (to) => ({ name: "TournamentDashboard", params: { id: to.params.id } }),
    children: [
      {
        path: "dashboard",
        name: "TournamentDashboard",
        component: tournamentDashboardPage,
      },
      {
        path: "tournament-ranking",
        name: "TournamentRankingPage",
        component: tournamentRankingsPage,
      },
      {
        path: "players",
        name: "PlayersStatsPage",
        component: tournamentPlayersStatsPage,
      },
      {
        path: "calendar",
        name: "CalendarPage",
        component: tournamentCalendarPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;