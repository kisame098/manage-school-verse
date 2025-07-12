
import React, { useState } from 'react';
import { GraduationCap, Eye, EyeOff, User, School, Phone, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface LoginFormData {
  schoolId: string;
  personalId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentRole, setCurrentRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    schoolId: '',
    personalId: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  // Identifiants de démonstration
  const demoCredentials = {
    admin: {
      personalId: 'admin001',
      schoolId: 'EDU001',
      password: 'admin2024'
    },
    director: {
      firstName: 'Marie',
      lastName: 'Dupont',
      schoolId: 'EDU001',
      phoneNumber: '0123456789',
      password: 'director2024'
    },
    teacher: {
      personalId: 'TEACH001',
      schoolId: 'EDU001',
      password: 'teacher2024'
    },
    student: {
      personalId: 'STUD001',
      schoolId: 'EDU001',
      password: 'student2024'
    }
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (currentRole === 'director') {
      if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
      if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Le numéro de téléphone est requis';
    } else {
      if (!formData.personalId.trim()) newErrors.personalId = 'L\'ID personnel est requis';
    }

    if (!formData.schoolId.trim()) newErrors.schoolId = 'L\'ID école est requis';
    if (!formData.password.trim()) newErrors.password = 'Le mot de passe est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulation d'une requête de connexion
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Vérification des identifiants de démonstration
      let isValidCredential = false;
      let userRole = currentRole;

      if (currentRole === 'admin') {
        isValidCredential = 
          formData.personalId === demoCredentials.admin.personalId &&
          formData.schoolId === demoCredentials.admin.schoolId &&
          formData.password === demoCredentials.admin.password;
      } else if (currentRole === 'director') {
        isValidCredential = 
          formData.firstName === demoCredentials.director.firstName &&
          formData.lastName === demoCredentials.director.lastName &&
          formData.schoolId === demoCredentials.director.schoolId &&
          formData.phoneNumber === demoCredentials.director.phoneNumber &&
          formData.password === demoCredentials.director.password;
      } else if (currentRole === 'teacher') {
        isValidCredential = 
          formData.personalId === demoCredentials.teacher.personalId &&
          formData.schoolId === demoCredentials.teacher.schoolId &&
          formData.password === demoCredentials.teacher.password;
      } else if (currentRole === 'student') {
        isValidCredential = 
          formData.personalId === demoCredentials.student.personalId &&
          formData.schoolId === demoCredentials.student.schoolId &&
          formData.password === demoCredentials.student.password;
      }

      if (isValidCredential) {
        // Enregistrement des informations de session
        const userData = {
          role: userRole,
          name: currentRole === 'director' 
            ? `${formData.firstName} ${formData.lastName}`
            : `Utilisateur ${userRole}`,
          schoolId: formData.schoolId,
          loginTime: new Date().toISOString()
        };

        localStorage.setItem('edumanage_user', JSON.stringify(userData));
        localStorage.setItem('edumanage_isLoggedIn', 'true');

        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${userData.name} !`,
        });

        // Redirection basée sur le rôle
        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Identifiants incorrects. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (role: string) => {
    const creds = demoCredentials[role as keyof typeof demoCredentials];
    if (role === 'director') {
      const directorCreds = demoCredentials.director;
      setFormData({
        ...formData,
        firstName: directorCreds.firstName,
        lastName: directorCreds.lastName,
        schoolId: directorCreds.schoolId,
        phoneNumber: directorCreds.phoneNumber,
        password: directorCreds.password,
        personalId: ''
      });
    } else {
      setFormData({
        ...formData,
        personalId: (creds as any).personalId || '',
        schoolId: creds.schoolId,
        password: creds.password,
        firstName: '',
        lastName: '',
        phoneNumber: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
            EduManage
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Connectez-vous à votre espace
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-gray-800 dark:text-gray-100">
              Connexion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={currentRole} onValueChange={setCurrentRole}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="student">Étudiant</TabsTrigger>
                <TabsTrigger value="teacher">Enseignant</TabsTrigger>
                <TabsTrigger value="director">Directeur</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin} className="space-y-4">
                <TabsContent value="student" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="student-id">ID Étudiant</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="student-id"
                        type="text"
                        placeholder="Votre ID étudiant"
                        value={formData.personalId}
                        onChange={(e) => handleInputChange('personalId', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {errors.personalId && (
                      <p className="text-sm text-red-500">{errors.personalId}</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="teacher" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-id">ID Enseignant</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="teacher-id"
                        type="text"
                        placeholder="Votre ID enseignant"
                        value={formData.personalId}
                        onChange={(e) => handleInputChange('personalId', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {errors.personalId && (
                      <p className="text-sm text-red-500">{errors.personalId}</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="director" className="space-y-4 mt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Prénom"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Nom"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="0123456789"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-sm text-red-500">{errors.phoneNumber}</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="admin-id">ID Administrateur</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="admin-id"
                        type="text"
                        placeholder="Votre ID administrateur"
                        value={formData.personalId}
                        onChange={(e) => handleInputChange('personalId', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    {errors.personalId && (
                      <p className="text-sm text-red-500">{errors.personalId}</p>
                    )}
                  </div>
                </TabsContent>

                {/* Champs communs */}
                <div className="space-y-2">
                  <Label htmlFor="schoolId">ID École</Label>
                  <div className="relative">
                    <School className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="schoolId"
                      type="text"
                      placeholder="ID de votre école"
                      value={formData.schoolId}
                      onChange={(e) => handleInputChange('schoolId', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.schoolId && (
                    <p className="text-sm text-red-500">{errors.schoolId}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Votre mot de passe"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-primary" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>
            </Tabs>

            {/* Identifiants de démonstration */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Identifiants de démonstration :</strong>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Étudiant:</span> 
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => fillDemoCredentials('student')}
                        className="h-auto p-1 text-blue-600 hover:text-blue-800"
                      >
                        STUD001 / EDU001
                      </Button>
                    </div>
                    <div className="flex justify-between">
                      <span>Enseignant:</span> 
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => fillDemoCredentials('teacher')}
                        className="h-auto p-1 text-blue-600 hover:text-blue-800"
                      >
                        TEACH001 / EDU001
                      </Button>
                    </div>
                    <div className="flex justify-between">
                      <span>Directeur:</span> 
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => fillDemoCredentials('director')}
                        className="h-auto p-1 text-blue-600 hover:text-blue-800"
                      >
                        Marie Dupont
                      </Button>
                    </div>
                    <div className="flex justify-between">
                      <span>Admin:</span> 
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => fillDemoCredentials('admin')}
                        className="h-auto p-1 text-blue-600 hover:text-blue-800"
                      >
                        admin001 / EDU001
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            ← Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
