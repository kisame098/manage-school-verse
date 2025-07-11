
import React from 'react';
import { 
  Users, 
  BarChart3, 
  GraduationCap, 
  Calendar, 
  MessageSquare, 
  BookOpen,
  Shield,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const features = [
    {
      icon: Users,
      title: "Gestion des Utilisateurs",
      description: "Gérez facilement étudiants, enseignants et directeurs avec des profils complets et des droits d'accès personnalisés."
    },
    {
      icon: BarChart3,
      title: "Tableau de Bord Analytique",
      description: "Visualisez les performances et statistiques en temps réel avec des graphiques interactifs et des rapports détaillés."
    },
    {
      icon: GraduationCap,
      title: "Gestion des Notes",
      description: "Système complet de notation avec calculs automatiques, bulletins personnalisables et suivi des progrès."
    },
    {
      icon: Calendar,
      title: "Suivi des Présences",
      description: "Enregistrement digital des présences avec notifications automatiques et rapports d'assiduité."
    },
    {
      icon: MessageSquare,
      title: "Centre de Communication",
      description: "Plateforme de communication intégrée pour faciliter les échanges entre tous les acteurs éducatifs."
    },
    {
      icon: BookOpen,
      title: "Gestion des Ressources",
      description: "Organisez et partagez les ressources pédagogiques, devoirs et documents administratifs."
    }
  ];

  const stats = [
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Protection des données avec chiffrement avancé"
    },
    {
      icon: Clock,
      title: "Support 24/7",
      description: "Assistance technique disponible en permanence"
    },
    {
      icon: CheckCircle,
      title: "Disponibilité 99.9%",
      description: "Infrastructure cloud haute performance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                EduManage
              </span>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Fonctionnalités
              </a>
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                À propos
              </a>
              <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Contact
              </a>
              <Button onClick={() => navigate('/login')} className="btn-primary">
                Connexion
              </Button>
            </nav>

            {/* Menu Mobile */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menu Mobile Ouvert */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Fonctionnalités
                </a>
                <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  À propos
                </a>
                <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </a>
                <Button onClick={() => navigate('/login')} className="btn-primary w-full">
                  Connexion
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Section Hero */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-teal-600 to-orange-600 bg-clip-text text-transparent leading-tight">
              Gestion Scolaire
              <br />
              Moderne Simplifiée
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              EduManage révolutionne la gestion éducative avec une plateforme intuitive 
              qui connecte étudiants, enseignants et administrateurs pour une expérience 
              d'apprentissage optimisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button onClick={() => navigate('/login')} className="btn-primary text-lg px-8 py-4 hover-scale">
                Commencer
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="btn-outline text-lg px-8 py-4 hover-scale">
                En savoir plus
              </Button>
            </div>
          </div>

          {/* Aperçu du Dashboard */}
          <div className="animate-slide-up relative max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white/80 ml-4 text-sm">dashboard.edumanage.app</span>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,247</div>
                    <div className="text-gray-600 dark:text-gray-300">Étudiants Actifs</div>
                  </div>
                  <div className="bg-teal-100 dark:bg-teal-900/20 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">89</div>
                    <div className="text-gray-600 dark:text-gray-300">Enseignants</div>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/20 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">15.2</div>
                    <div className="text-gray-600 dark:text-gray-300">Moyenne Générale</div>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-r from-blue-200 to-teal-200 dark:from-blue-800 dark:to-teal-800 rounded-lg opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section id="features" className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Fonctionnalités Principales
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez les outils puissants qui transformeront votre établissement éducatif
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section À Propos */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Pourquoi Choisir EduManage ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Notre mission est de simplifier la gestion éducative en offrant des outils 
              modernes, sécurisés et faciles à utiliser pour tous les acteurs de l'éducation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  {stat.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Contactez-Nous
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Notre équipe est là pour vous accompagner dans votre transformation digitale
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">Téléphone</h3>
                  <p className="text-gray-600 dark:text-gray-300">+33 1 23 45 67 89</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">contact@edumanage.fr</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">Adresse</h3>
                  <p className="text-gray-600 dark:text-gray-300">123 Rue de l'Innovation<br />75001 Paris, France</p>
                </div>
              </div>
            </div>

            <Card className="edu-card">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                  Demande d'Information
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Prénom"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    />
                    <input
                      type="text"
                      placeholder="Nom"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Adresse email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  />
                  <textarea
                    placeholder="Votre message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  ></textarea>
                  <Button className="btn-primary w-full">
                    Envoyer le Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">EduManage</span>
              </div>
              <p className="text-gray-300">
                La solution moderne pour la gestion de votre établissement éducatif.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Liens Rapides</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">Connexion</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Formation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-sm">f</span>
                  </div>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-sm">t</span>
                  </div>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-sm">in</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 EduManage. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
