const deleteAttachment = async (filename) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/attachments/${filename}`);
      message.success('Attachment deleted successfully.');
      await fetchUserInfo(token);
      setAttachments([]);
    } catch (err) {
      message.error('Something went wrong.');
      console.error(err);
    }
  };