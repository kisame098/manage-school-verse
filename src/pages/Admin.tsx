
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  GraduationCap,
  LogOut,
  Search,
  Power,
  PowerOff
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface Director {
  id: string;
  firstName: string;
  lastName: string;
  schoolName: string;
  schoolId: string;
  phoneNumber: string;
  password: string;
  isActive: boolean;
  createdAt: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [directors, setDirectors] = useState<Director[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDirector, setEditingDirector] = useState<Director | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    schoolName: '',
    schoolId: '',
    phoneNumber: '',
    password: ''
  });

  useEffect(() => {
    // Vérifier l'authentification admin
    const isLoggedIn = localStorage.getItem('edumanage_isLoggedIn');
    const userDataStr = localStorage.getItem('edumanage_user');
    
    if (!isLoggedIn || !userDataStr) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(userDataStr);
    if (userData.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    // Charger les directeurs depuis le localStorage
    loadDirectors();
  }, [navigate]);

  const loadDirectors = () => {
    const savedDirectors = localStorage.getItem('edumanage_directors');
    if (savedDirectors) {
      setDirectors(JSON.parse(savedDirectors));
    } else {
      // Données de démonstration
      const defaultDirectors: Director[] = [
        {
          id: '1',
          firstName: 'Marie',
          lastName: 'Dupont',
          schoolName: 'École Primaire Les Roses',
          schoolId: 'EDU001',
          phoneNumber: '0123456789',
          password: 'director2024',
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          firstName: 'Jean',
          lastName: 'Martin',
          schoolName: 'Collège Saint-Antoine',
          schoolId: 'EDU002',
          phoneNumber: '0123456788',
          password: 'director2024',
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      setDirectors(defaultDirectors);
      localStorage.setItem('edumanage_directors', JSON.stringify(defaultDirectors));
    }
  };

  const saveDirectors = (updatedDirectors: Director[]) => {
    setDirectors(updatedDirectors);
    localStorage.setItem('edumanage_directors', JSON.stringify(updatedDirectors));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDirector) {
      // Modifier un directeur existant
      const updatedDirectors = directors.map(director =>
        director.id === editingDirector.id
          ? { ...director, ...formData }
          : director
      );
      saveDirectors(updatedDirectors);
      toast({
        title: "Directeur modifié",
        description: "Les informations ont été mises à jour avec succès.",
      });
    } else {
      // Ajouter un nouveau directeur
      const newDirector: Director = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      saveDirectors([...directors, newDirector]);
      toast({
        title: "Directeur ajouté",
        description: "Le nouveau directeur a été créé avec succès.",
      });
    }

    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      schoolName: '',
      schoolId: '',
      phoneNumber: '',
      password: ''
    });
    setEditingDirector(null);
  };

  const handleEdit = (director: Director) => {
    setEditingDirector(director);
    setFormData({
      firstName: director.firstName,
      lastName: director.lastName,
      schoolName: director.schoolName,
      schoolId: director.schoolId,
      phoneNumber: director.phoneNumber,
      password: director.password
    });
    setIsModalOpen(true);
  };

  const handleDelete = (directorId: string) => {
    const updatedDirectors = directors.filter(director => director.id !== directorId);
    saveDirectors(updatedDirectors);
    toast({
      title: "Directeur supprimé",
      description: "Le directeur a été supprimé avec succès.",
    });
  };

  const toggleDirectorStatus = (directorId: string) => {
    const updatedDirectors = directors.map(director =>
      director.id === directorId
        ? { ...director, isActive: !director.isActive }
        : director
    );
    saveDirectors(updatedDirectors);
    
    const director = directors.find(d => d.id === directorId);
    toast({
      title: director?.isActive ? "Directeur désactivé" : "Directeur activé",
      description: `Le compte a été ${director?.isActive ? 'désactivé' : 'activé'} avec succès.`,
    });
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

  const filteredDirectors = directors.filter(director =>
    director.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    director.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    director.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    director.schoolId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              EduManage
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Administration
          </p>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-2 rounded-lg flex items-center space-x-3">
              <Users className="w-5 h-5" />
              <span>Gestion des Directeurs</span>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="ml-64 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Gestion des Directeurs
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Administrez les comptes directeurs de votre système EduManage
          </p>
        </div>

        {/* Barre d'actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un directeur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary" onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un Directeur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingDirector ? 'Modifier le Directeur' : 'Ajouter un Directeur'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="schoolName">Nom de l'école</Label>
                  <Input
                    id="schoolName"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="schoolId">ID École</Label>
                  <Input
                    id="schoolId"
                    value={formData.schoolId}
                    onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button type="submit" className="btn-primary flex-1">
                    {editingDirector ? 'Modifier' : 'Ajouter'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Liste des directeurs */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Liste des Directeurs ({filteredDirectors.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Nom</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">École</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">ID École</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Téléphone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDirectors.map((director) => (
                    <tr key={director.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-100">
                            {director.firstName} {director.lastName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            ID: {director.id}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-800 dark:text-gray-100">
                        {director.schoolName}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        {director.schoolId}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        {director.phoneNumber}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={director.isActive ? 'status-active' : 'status-inactive'}>
                          {director.isActive ? 'Actif' : 'Inactif'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(director)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleDirectorStatus(director.id)}
                            className={director.isActive 
                              ? "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                              : "text-green-600 hover:text-green-700 hover:bg-green-50"
                            }
                          >
                            {director.isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(director.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredDirectors.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">
                    {searchTerm ? 'Aucun directeur trouvé pour cette recherche' : 'Aucun directeur enregistré'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
