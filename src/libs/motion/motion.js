/*
<motion.section
	initial={{ opacity: 0, y: 40 }}
	whileInView={{ opacity: 1, y: 0 }}
	transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
	viewport={{ once: true }}
>
*/

export const appear_initial = { opacity: 0, y: 40 };
export const appear_whileInView = { opacity: 1, y: 0 };
// export const appear_transition_fast = {
//   duration: 0.8,
//   ease: "easeOut",
// };
export const appear_transition = { duration: 0.8, ease: "easeOut"};
export const appear_viewport = { once: true };
