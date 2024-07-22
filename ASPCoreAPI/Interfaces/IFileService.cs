namespace ASPCoreAPI.Interfaces
{
    public interface IFileService
    {
        public Tuple<int, string> SaveImage(IFormFile imageFile);
        public Task DeleteImage(string imageFileName);
        public IFormFile Base64ToImage(string base64, string name);
    }
}
