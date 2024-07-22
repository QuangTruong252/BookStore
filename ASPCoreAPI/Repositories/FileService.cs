using ASPCoreAPI.Interfaces;
using ASPCoreAPI.Migrations;

namespace ASPCoreAPI.Repositories
{
    public class FileService : IFileService
    {
        private IWebHostEnvironment environment;
        public FileService(IWebHostEnvironment env) 
        {
            this.environment = env;
        }

        public IFormFile Base64ToImage(string base64, string name)
        {
            string convert = base64.Replace("data:text/html;base64,", String.Empty);
            byte[] bytes = Convert.FromBase64String(convert);
            MemoryStream stream = new MemoryStream(bytes);

            IFormFile file = new FormFile(stream, 0, bytes.Length, name, name);
            return file;
        }

        public async Task DeleteImage(string imageFileName)
        {
            var contentPath = this.environment.ContentRootPath;
            var path = Path.Combine(contentPath, "$Uploads", imageFileName);
            if(File.Exists(path)) File.Delete(path);
        }

        public Tuple<int, string> SaveImage(IFormFile imageFile)
        {
            try
            {
                var contentPath = this.environment.ContentRootPath;
                var path = Path.Combine(contentPath, "Uploads");

                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                var ext = Path.GetExtension(imageFile.FileName);
                var allowedExtensions = new string[] { ".jpg", ".png", ".jpeg" };
                if (!allowedExtensions.Contains(ext)) {
                    string msg = string.Format("Only {0} extensions are allowed", string.Join(",", allowedExtensions));
                    return new Tuple<int, string>(0, msg);
                }

                string uniqueString = Guid.NewGuid().ToString();

                var newFileName = uniqueString + ext;
                var fileWithPath = Path.Combine(path, newFileName);
                var stream = new FileStream(fileWithPath, FileMode.Create);
                imageFile.CopyTo(stream);
                stream.Close();
                return new Tuple<int, string>(1, newFileName);
            }
            catch (Exception ex)
            {
                return new Tuple<int, string>(0, "Error has occured");
            }
        }
    }
}
