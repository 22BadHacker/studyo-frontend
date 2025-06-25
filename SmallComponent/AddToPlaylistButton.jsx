'use client'
import { useState } from 'react';
import { Modal, Button, List, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import CreatePlaylistModal from './CreatePlaylistModal';
import { useAppHook } from '@/context/AppProvider';

const AddToPlaylistButton = ({ trackId }) => {
  const [visible, setVisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const { authToken } = useAppHook();

  const fetchUserPlaylists = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/playlists', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPlaylists(response.data);
    } catch (error) {
      message.error('Failed to fetch playlists');
    }
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await axios.post(`http://localhost:8000/api/playlists/${playlistId}/tracks`, { track_id: trackId }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      message.success('Track added to playlist');
      setVisible(false);
    } catch (error) {
      message.error('Failed to add track to playlist');
    }
  };

  const showModal = () => {
    fetchUserPlaylists();
    setVisible(true);
  };

  return (
    <>
      <Button 
        type="text" 
        icon={<PlusOutlined />} 
        onClick={showModal}
        style={{ color: '#fff' }}
      />
      
      <Modal
        title="Add to Playlist"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {playlists.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>You don't have any playlists yet</p>
            <Button 
              type="primary" 
              onClick={() => {
                setVisible(false);
                setCreateModalVisible(true);
              }}
            >
              Create New Playlist
            </Button>
          </div>
        ) : (
          <List
            dataSource={playlists}
            renderItem={playlist => (
              <List.Item 
                onClick={() => handleAddToPlaylist(playlist.id)}
                style={{ cursor: 'pointer', padding: '10px' }}
              >
                <List.Item.Meta
                  title={playlist.name}
                  description={`${playlist.tracks_count || 0} tracks`}
                />
              </List.Item>
            )}
          />
        )}
      </Modal>
      
      <CreatePlaylistModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSuccess={(newPlaylist) => {
          setPlaylists([...playlists, newPlaylist]);
          handleAddToPlaylist(newPlaylist.id);
          setCreateModalVisible(false);
        }}
      />
    </>
  );
};

export default AddToPlaylistButton;