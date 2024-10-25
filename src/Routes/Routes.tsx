import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import HomePage from "../Pages/HomePage/HomePage";
import AccountPage from "../Pages/AccountPage/AccountPage";
import NotFound from "../Pages/NotFound/NotFound";
import ResetPasswordPage from "../Pages/ResetPasswordPage/ResetPasswordPage";
import MessagePage from "../Pages/MessagePage/MessagePage";
import EventPage from "../Pages/EventPage/EventPage";
import EventListPage from "../Pages/EventListPage/EventListPage";
import MemberRegisterPage from "../Pages/MemberRegisterPage/MemberRegisterPage";
import ForgotPassword from "../Pages/ForgotPasswordPage/ForgotPassword";
import ChangePasswordPage from "../Pages/ChangePasswordPage/ChangePasswordPage";
import Contact from "../Pages/Contact/Contact";
import ProtectedRoute from "../Library/Routes/ProtectedRoute";
import TestTaskPage from "../Pages/TestTaskPage/TestTaskPage";
import Documents from "../Pages/Documents/Documents";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/password/reset",
        element: <ResetPasswordPage />,
      },
      {
        path: "/password/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "/sukces/forgot",
        element: <MessagePage
          title="Sukces!"
          message="Link do zmiany hasła został wysłany na podany adres email."
          buttonOneText="Konto"
          buttonOneLink="/login"
          buttonTwoText="Strona główna"
          buttonTwoLink="/"
        />
      },
      {
        path: "/wiadomosc/druzyna/usunieta",
        element: <MessagePage
          title="Zespół usunięty"
          message="Twoja drużyna została usunięta."
          buttonOneText="Wydarzenia"
          buttonOneLink="/wydarzenia"
          buttonTwoText="Strona główna"
          buttonTwoLink="/"
        />
      },
      {
        path: "/password/change",
        element:
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>,
      },
      {
        path: "/sukces/reset",
        element: <MessagePage
          title="Gratulacje!"
          message="Twoje hasło zostało zmienione."
          buttonOneText="Konto"
          buttonOneLink="/login"
          buttonTwoText="Strona główna"
          buttonTwoLink="/"
        />
      },
      {
        path: "/kontakt",
        element: <Contact />
      },
      {
        path: "/rejestracja",
        element: <RegisterPage />,
      },
      {
        path: "/rejestracja/:teamName",
        element: <MemberRegisterPage />,
      },
      {
        path: "/sukces/rejestracja",
        element: <MessagePage
          title="Gratulajce!"
          message="Twój zespół został stworzony. Sprawdź swoją skrzynkę mailową, aby dokończyć rejestrację."
          buttonOneText="Strona główna"
          buttonOneLink="/"
        />
      },
      {
        path: "/sukces/rejestracja/uczestnika",
        element: <MessagePage
          title="Gratulajce!"
          message="Zakończyłeś proces rejestracji. Teraz możesz zalogować się na swoje konto."
          buttonOneText="Konto"
          buttonOneLink="/login"
          buttonTwoText="Strona główna"
          buttonTwoLink="/"
        />
      },
      {
        path: "/konto",
        element:
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>,
      },
      {
        path: "/konto/dokumenty",
        element: <ProtectedRoute>
          <Documents />
        </ProtectedRoute>
      },
      {
        path: "/wydarzenia",
        element: <EventListPage />,
      },
      {
        path: "/wydarzenia/:eventName",
        element: <EventPage />,
      },
      // {
      //   path: "/zadanie",
      //   element:
      //     <ProtectedRoute>
      //       <TestTaskPage />
      //     </ProtectedRoute>
      // },
      // {
      //   path: "/zadanie/poprawne",
      //   element: <MessagePage
      //     title="Gratulacje!"
      //     message="Poprawnie rozwiązałeś zadanie. Wkrótce otrzymasz maila z informacją czy udało Ci się zakwalifikować."
      //     buttonOneText="Konto"
      //     buttonOneLink="/konto"
      //     buttonTwoText="Strona główna"
      //     buttonTwoLink="/"
      //   />
      // },
      {
        path: "/zadanie/niepoprawne",
        element: <MessagePage
          title="Brak prób"
          message="Niestety wykorzystałeś wszystkie próby. Wkrótce otrzymasz maila z informacją czy udało Ci się zakwalifikować."
          buttonOneText="Konto"
          buttonOneLink="/konto"
          buttonTwoText="Strona główna"
          buttonTwoLink="/"
        />
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
