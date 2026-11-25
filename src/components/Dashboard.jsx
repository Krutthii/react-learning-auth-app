import java.net.*;
import java.io.*;

public class TCPServer {
    public static void main(String args[]) throws Exception {
        ServerSocket sersock = new ServerSocket(4000);

        System.out.println("Server ready for connection");

        Socket sock = sersock.accept();

        System.out.println("Client connected successfully");

        BufferedReader fileRead = new BufferedReader(
            new InputStreamReader(sock.getInputStream()));

        String fname = fileRead.readLine();
        File file = new File(fname);

        PrintWriter pwrite = new PrintWriter(
            sock.getOutputStream(), true);

        if (file.exists() && file.isFile()) {

            BufferedReader contentRead =
                new BufferedReader(new FileReader(file));

            String str;

        
            while ((str = contentRead.readLine()) != null) {
                pwrite.println(str);
            }

            contentRead.close();

        } else {
            pwrite.println("File not found on server!");
        }

        System.out.println("File transfer completed");
        pwrite.close();
        fileRead.close();
        sock.close();
        sersock.close();
    }
}