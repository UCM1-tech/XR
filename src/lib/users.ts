import { getApiClient } from '@/lib/api';
import type { UserProfile } from '@/store/auth';

export async function fetchUserProfile(userId: string): Promise<UserProfile> {
  const api = getApiClient();
  const { data } = await api.get(`/users/${userId}`);
  return data as UserProfile;
}

export async function updateUserProfile(userId: string, payload: Partial<UserProfile>): Promise<UserProfile> {
  const api = getApiClient();
  const { data } = await api.put(`/users/${userId}`, payload);
  return data as UserProfile;
}

