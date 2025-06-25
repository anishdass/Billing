package In.anishdass.billingsoftware.test;

public class Test {
    public static int convertToInt(String number) {
        int len = number.length() - 1;
        int actualNumber = 0;
        for (char num : number.toCharArray()) {
            int numericalEquivalent = (int) num - 48;
            actualNumber += (int) (numericalEquivalent * Math.pow(10, len));
            len--;
        }
        return actualNumber;
    }

    public static void main(String[] args) {
        System.out.println(convertToInt("-1"));
    }
}
