/**
 * num
 */
public class num {

    public static void main(String[] args) {
        
        char c = '.';
        // i

        boolean bool = false;
        int ascii = c;

        if(ascii <= 48  ||  ascii >= 57){
            bool = true;
        }

        System.out.println("---");
        System.out.println(ascii);
        System.out.println(bool);
    }
}