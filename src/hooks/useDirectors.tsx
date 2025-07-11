
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Director {
  id: string;
  user_id: string | null;
  school_id: string;
  created_by: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    first_name: string;
    last_name: string;
    phone_number: string | null;
  };
  schools?: {
    school_name: string;
  };
}

export const useDirectors = () => {
  const { user } = useAuth();
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDirectors();
    }
  }, [user]);

  const fetchDirectors = async () => {
    try {
      const { data, error } = await supabase
        .from('directors')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name,
            phone_number
          ),
          schools:school_id (
            school_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching directors:', error);
        return;
      }

      setDirectors(data || []);
    } catch (error) {
      console.error('Error fetching directors:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDirector = async (directorData: {
    firstName: string;
    lastName: string;
    schoolName: string;
    schoolId: string;
    phoneNumber: string;
    password: string;
  }) => {
    try {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: `${directorData.firstName.toLowerCase()}.${directorData.lastName.toLowerCase()}@${directorData.schoolId.toLowerCase()}.edu`,
        password: directorData.password,
        user_metadata: {
          first_name: directorData.firstName,
          last_name: directorData.lastName,
          phone_number: directorData.phoneNumber,
          school_id: directorData.schoolId,
          role: 'director'
        }
      });

      if (authError) {
        console.error('Error creating auth user:', authError);
        return { error: authError };
      }

      // Create or update the school
      const { error: schoolError } = await supabase
        .from('schools')
        .upsert({
          school_id: directorData.schoolId,
          school_name: directorData.schoolName,
          director_id: authData.user?.id
        });

      if (schoolError) {
        console.error('Error creating school:', schoolError);
        return { error: schoolError };
      }

      // Create the director record
      const { error: directorError } = await supabase
        .from('directors')
        .insert({
          user_id: authData.user?.id,
          school_id: directorData.schoolId,
          created_by: user?.id
        });

      if (directorError) {
        console.error('Error creating director:', directorError);
        return { error: directorError };
      }

      await fetchDirectors();
      return { error: null };
    } catch (error) {
      console.error('Error creating director:', error);
      return { error };
    }
  };

  const updateDirector = async (directorId: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('directors')
        .update(updates)
        .eq('id', directorId);

      if (error) {
        console.error('Error updating director:', error);
        return { error };
      }

      await fetchDirectors();
      return { error: null };
    } catch (error) {
      console.error('Error updating director:', error);
      return { error };
    }
  };

  const deleteDirector = async (directorId: string) => {
    try {
      const { error } = await supabase
        .from('directors')
        .delete()
        .eq('id', directorId);

      if (error) {
        console.error('Error deleting director:', error);
        return { error };
      }

      await fetchDirectors();
      return { error: null };
    } catch (error) {
      console.error('Error deleting director:', error);
      return { error };
    }
  };

  return {
    directors,
    loading,
    fetchDirectors,
    createDirector,
    updateDirector,
    deleteDirector
  };
};
