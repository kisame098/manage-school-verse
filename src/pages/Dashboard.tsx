
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Calendar, 
  User, 
  BookOpen,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Menu,
  Sun,
  Moon,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface UserData {
  role: string;
  name: string;
  schoolId: string;
  loginTime: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Vérifier l'authentification
    const isLoggedIn = localStorage.getItem('edumanage_isLoggedIn');
    const userDataStr = localStorage.getItem('edumanage_user');
    
    if (!isLoggedIn || !userDataStr) {
      navigate('/login');
      return;
    }

    setUserData(JSON.parse(userDataStr));

    // Récupérer la préférence de thème
    const savedTheme = localStorage.getItem('edumanage_theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, [navigate]);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('edumanage_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('edumanage_theme', 'light');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('edumanage_isLoggedIn');
    localStorage.removeItem('edumanage_user');
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate('/login');
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
    { id: 'grades', label: 'Notes', icon: BookOpen },
    { id: 'attendance', label: 'Présences', icon: Calendar },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  // Données simulées pour les différents rôles
  const getDashboardData = () => {
    const baseData = {
      stats: [
        {
          title: "Notes Récentes",
          value: "15.2",
          change: "+2.1",
          trend: "up",
          description: "Moyenne générale"
        },
        {
          title: "Présences",
          value: "94%",
          change: "+1.2%",
          trend: "up",
          description: "Ce mois"
        },
        {
          title: "Devoirs",
          value: "12",
          change: "-3",
          trend: "down",
          description: "En attente"
        }
      ],
      recentActivities: [
        {
          type: "grade",
          subject: "Mathématiques",
          description: "Note ajoutée: 16/20",
          time: "Il y a 2 heures",
          status: "success"
        },
        {
          type: "attendance",
          subject: "Présence",
          description: "Présent en cours de Français",
          time: "Il y a 3 heures",
          status: "success"
        },
        {
          type: "assignment",
          subject: "Histoire",
          description: "Devoir à rendre demain",
          time: "Il y a 1 jour",
          status: "warning"
        },
        {
          type: "grade",
          subject: "Sciences",
          description: "Note ajoutée: 14/20",
          time: "Il y a 2 jours",
          status: "success"
        }
      ]
    };

    if (userData?.role === 'teacher') {
      baseData.stats = [
        {
          title: "Étudiants",
          value: "127",
          change: "+5",
          trend: "up",
          description: "Total inscrit"
        },
        {
          title: "Cours",
          value: "24",
          change: "0",
          trend: "neutral",
          description: "Cette semaine"
        },
        {
          title: "Devoirs",
          value: "18",
          change: "+6",
          trend: "up",
          description: "À corriger"
        }
      ];
    } else if (userData?.role === 'director') {
      baseData.stats = [
        {
          title: "Étudiants",
          value: "1,247",
          change: "+47",
          trend: "up",
          description: "Total inscrit"
        },
        {
          title: "Enseignants",
          value: "89",
          change: "+2",
          trend: "up",
          description: "Actifs"
        },
        {
          title: "Taux Réussite",
          value: "87%",
          change: "+3%",
          trend: "up",
          description: "Ce trimestre"
        }
      ];
    }

    return baseData;
  };

  const dashboardData = getDashboardData();

  const renderDashboardContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboardData.stats.map((stat, index) => (
                <Card key={index} className="edu-card hover-scale">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {stat.description}
                        </p>
                      </div>
                      <div className={`flex items-center space-x-1 ${
                        stat.trend === 'up' ? 'text-green-600' : 
                        stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stat.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                        {stat.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                        <span className="text-sm font-medium">{stat.change}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Activités récentes */}
            <Card className="edu-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Activités Récentes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.status === 'success' ? 'bg-green-100 text-green-600' :
                        activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {activity.status === 'success' && <CheckCircle className="w-4 h-4" />}
                        {activity.status === 'warning' && <AlertCircle className="w-4 h-4" />}
                        {activity.status === 'info' && <BookOpen className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 dark:text-gray-100">
                          {activity.subject}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'grades':
        return (
          <Card className="edu-card">
            <CardHeader>
              <CardTitle>Mes Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Matière</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Note</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Coefficient</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { subject: 'Mathématiques', grade: '16/20', coefficient: '3', date: '15/11/2024' },
                      { subject: 'Français', grade: '14/20', coefficient: '2', date: '12/11/2024' },
                      { subject: 'Histoire', grade: '15/20', coefficient: '2', date: '10/11/2024' },
                      { subject: 'Sciences', grade: '17/20', coefficient: '3', date: '08/11/2024' },
                    ].map((grade, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-3 px-4 text-gray-800 dark:text-gray-100">{grade.subject}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {grade.grade}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{grade.coefficient}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{grade.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );

      case 'attendance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="edu-card">
                <CardHeader>
                  <CardTitle>Statistiques de Présence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Présences</span>
                      <span className="font-semibold text-green-600">89%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Absences</span>
                      <span className="font-semibold text-red-600">8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Retards</span>
                      <span className="font-semibold text-yellow-600">3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="edu-card">
                <CardHeader>
                  <CardTitle>Cette Semaine</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { day: 'Lundi', status: 'present' },
                      { day: 'Mardi', status: 'present' },
                      { day: 'Mercredi', status: 'late' },
                      { day: 'Jeudi', status: 'present' },
                      { day: 'Vendredi', status: 'absent' },
                    ].map((day, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">{day.day}</span>
                        <Badge 
                          className={
                            day.status === 'present' ? 'status-active' :
                            day.status === 'late' ? 'status-warning' :
                            'status-error'
                          }
                        >
                          {day.status === 'present' ? 'Présent' :
                           day.status === 'late' ? 'Retard' : 'Absent'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'profile':
        return (
          <Card className="edu-card">
            <CardHeader>
              <CardTitle>Mon Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-teal-600 text-white text-2xl">
                      {userData?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      {userData?.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 capitalize">
                      {userData?.role}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      École: {userData?.schoolId}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Informations Personnelles</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Rôle:</span>
                        <span className="text-gray-800 dark:text-gray-100 capitalize">{userData?.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">École:</span>
                        <span className="text-gray-800 dark:text-gray-100">{userData?.schoolId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Dernière connexion:</span>
                        <span className="text-gray-800 dark:text-gray-100">
                          {userData?.loginTime ? new Date(userData.loginTime).toLocaleString('fr-FR') : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Préférences</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Mode sombre</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleTheme}
                          className="p-2"
                        >
                          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return <div>Contenu non trouvé</div>;
    }
  };

  if (!userData) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                EduManage
              </span>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === item.id
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="w-full justify-start"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {sidebarOpen && <span className="ml-3">Thème</span>}
          </Button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 capitalize">
                  {currentView === 'dashboard' ? 'Tableau de Bord' : 
                   navigationItems.find(item => item.id === currentView)?.label}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Bienvenue, {userData.name}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-teal-600 text-white">
                        {userData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{userData.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 capitalize">{userData.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setCurrentView('profile')}>
                    <User className="w-4 h-4 mr-2" />
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="flex-1 p-6">
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
